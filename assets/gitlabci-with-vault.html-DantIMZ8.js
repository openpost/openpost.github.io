import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,h as t}from"./app-DhMJQ1_3.js";const p="/assets/gitlabci-with-vault-1-CjLI76-6.png",e="/assets/gitlabci-with-vault-2-NRJxfTRy.png",l={},o=t(`<h1 id="gitlab-파이프라인의-secret을-vault로-관리" tabindex="-1"><a class="header-anchor" href="#gitlab-파이프라인의-secret을-vault로-관리"><span>Gitlab 파이프라인의 Secret을 Vault로 관리</span></a></h1><blockquote><p>Vault 설정 참고 링크: <a href="https://developer.hashicorp.com/well-architected-framework/security/security-cicd-vault" target="_blank" rel="noopener noreferrer">Hashicorp 공홈</a></p></blockquote><blockquote><p>Nomad Vault 연동 참고 링크: <a href="https://docmoa.github.io/04-HashiCorp/07-Nomad/04-UseCase/spring-boot-with-vaultandNomad.html" target="_blank" rel="noopener noreferrer">docmoa</a></p></blockquote><p>Application을 배포할때 우리는 <strong>Application의 Secret</strong>만 관리하는 것이 아닌, <strong>CI또는 CD 단계에서 사용되는 Secret</strong>의 정보 또한 우리가 관리하는 대상이 됩니다.</p><p>가령 그러한 정보들은 다음과 같습니다.</p><ul><li>kubernetes api 통신을 위한 <strong>kubectl</strong></li><li>Nomad Deploy에 필요한 role이 적용된 <strong>Token</strong></li><li>다이렉트로 EC2에 배포하기 위한 <strong>ssh pem</strong></li><li>Argo-cd 배포를 위한 인증정보</li><li>그밖에 다양한 연동 tool의 인증, 인가정보</li></ul><p>이러한 다양한 Secret은 Vault를 통해 <strong>동적으로 관리</strong>할 수 있으며, 동적인 Secret Engine이 제공되지 않는다면 KV Secret Engine을 통해서 <strong>Static한 Data</strong>를 저장해서 관리 할 수도 있습니다.</p><p>이번 파이프라인은 Vault에서 Nomad Token을 받아오기 위한 Secret Engine을 만들고 Gitlab CI에서 배포 시 Token을 생성하여 Application을 배포하는 과정을 테스트해보도록 하겠습니다.</p><ol><li>Vault Secret Engine 설정</li></ol><ul><li>Vault Secret Engine은 아래와 같이 설정했습니다.</li></ul><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#Vault에서 제공하는 Nomad Secret Engine을 생성합니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_nomad_secret_backend&quot;</span></span> <span class="token string">&quot;config&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">backend</span>                   <span class="token punctuation">=</span> <span class="token string">&quot;nomad&quot;</span></span>
<span class="line">  <span class="token property">description</span>               <span class="token punctuation">=</span> <span class="token string">&quot;mzc nomad-server description&quot;</span></span>
<span class="line">  <span class="token property">default_lease_ttl_seconds</span> <span class="token punctuation">=</span> <span class="token string">&quot;360&quot;</span></span>
<span class="line">  <span class="token property">max_lease_ttl_seconds</span>     <span class="token punctuation">=</span> <span class="token string">&quot;720&quot;</span></span>
<span class="line">  <span class="token property">address</span>                   <span class="token punctuation">=</span> <span class="token string">&quot;https://<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">nomad_addr</span><span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">  <span class="token property">token</span>                     <span class="token punctuation">=</span> data.local_file.nomad_bootstrap.content</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#해당 role에 대해서는 배포를 위해 management 권한으로 설정합니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_nomad_secret_role&quot;</span></span> <span class="token string">&quot;nomad_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">backend</span>   <span class="token punctuation">=</span> vault_nomad_secret_backend.config.backend</span>
<span class="line">  <span class="token property">role</span>      <span class="token punctuation">=</span> <span class="token string">&quot;nomad_role&quot;</span></span>
<span class="line">  <span class="token property">global</span>    <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">type</span>      <span class="token punctuation">=</span> <span class="token string">&quot;management&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>Vault gitlab jwt 연동</li></ol><ul><li>Gitlab CI에서 Vault의 인증인가를 받기 위해 JWT 연동을 진행합니다. <ul><li>해당 auth의 role에 token policy는 1번에서 생성한 nomad secret engine의 접근 가능하게 설정합니다.</li></ul></li></ul><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_jwt_auth_backend&quot;</span></span> <span class="token string">&quot;gitlab&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;JWT Auth for GitLab&quot;</span>  </span>
<span class="line">  <span class="token property">path</span>               <span class="token punctuation">=</span> <span class="token string">&quot;gitlab-jwt&quot;</span></span>
<span class="line">  <span class="token property">oidc_discovery_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://gitlab-url.url&quot;</span></span>
<span class="line">  <span class="token property">bound_issuer</span>       <span class="token punctuation">=</span> <span class="token string">&quot;https://gitlab-url.url&quot;</span>  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_policy&quot;</span></span> <span class="token string">&quot;nomad_mgmt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad-mgmt&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">policy</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOT</span>
<span class="line">path &quot;nomad/creds/nomad_role&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;,&quot;create&quot;]</span>
<span class="line">}</span>
<span class="line">path &quot;nomad/creds/nomad_role/*&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;,&quot;create&quot;]</span>
<span class="line">}</span>
<span class="line">EOT</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#제 환경의 gitlab repository(project)의 id가 5입니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_jwt_auth_backend_role&quot;</span></span> <span class="token string">&quot;gitlab_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">backend</span>            <span class="token punctuation">=</span> vault_jwt_auth_backend.gitlab.path</span>
<span class="line">  <span class="token property">role_name</span>          <span class="token punctuation">=</span> <span class="token string">&quot;gitlab-role&quot;</span></span>
<span class="line">  <span class="token property">role_type</span>          <span class="token punctuation">=</span> <span class="token string">&quot;jwt&quot;</span></span>
<span class="line">  <span class="token property">bound_audiences</span>    <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://gitlab-url.url&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">user_claim</span>         <span class="token punctuation">=</span> <span class="token string">&quot;user_email&quot;</span></span>
<span class="line">  <span class="token property">token_policies</span>     <span class="token punctuation">=</span> <span class="token punctuation">[</span>vault_policy.nomad_mgmt.name<span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">bound_claims</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">project_id</span> <span class="token punctuation">=</span> <span class="token string">&quot;5&quot;</span>,</span>
<span class="line">    <span class="token property">ref</span> <span class="token punctuation">=</span> <span class="token string">&quot;main&quot;</span>,</span>
<span class="line">    <span class="token property">ref_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;branch&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>Gitlab-CI 설정</li></ol><ul><li>.gitlab-ci.yml 파일입니다. <ul><li>파이프라인 전체는 아니며 Gitlab ci에서 Vault의 인증인가를 받고 Nomad Token을 활용하는 CD 단계로 보시면 됩니다.</li><li>bound_audiences에 기입 한 값 기준으로 체크 후 임시 Token을 발급받습니다.</li><li>jwt Token을 기반으로 미리 연동해 둔 gitlab-role에 대한 token을 받아옵니다.</li><li>gitlab-role token을 활용하여 Nomad token을 다음 stage로 넘겨줍니다.</li></ul></li></ul><div class="language-yaml" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token punctuation">---</span></span>
<span class="line"><span class="token key atrule">vault-integrate</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> vault_token_inject</span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> hashicorp/vault<span class="token punctuation">:</span>latest  </span>
<span class="line">  <span class="token key atrule">id_tokens</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">VAULT_AUTH_TOKEN</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment">#bound_audiences에 기입 한 값 기준으로 체크 후 임시 Token을 발급받습니다.</span></span>
<span class="line">      <span class="token comment">#물론 bound_claims에 있는 값도 일치해야 합니다.</span></span>
<span class="line">      <span class="token key atrule">aud</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//gitlab<span class="token punctuation">-</span>url.url</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">    export VAULT_ADDR=https://$VAULT_URL:8200</span>
<span class="line">    export VAULT_NAMESPACE=admin</span>
<span class="line">    #jwt Token을 기반으로 미리 연동해 둔 gitlab-role에 대한 token을 받아옵니다.</span>
<span class="line">    export VAULT_TOKEN=&quot;$(vault write -field=token auth/gitlab-jwt/login role=gitlab-role jwt=$VAULT_AUTH_TOKEN)&quot;</span>
<span class="line">    export NOMAD_DEPLOY_TOKEN=&quot;$(vault read -field=secret_id nomad/creds/nomad_role)&quot;</span></span>
<span class="line"></span>
<span class="line">    echo &quot;export NOMAD_TOKEN=$NOMAD_DEPLOY_TOKEN&quot; <span class="token punctuation">&gt;</span> nomad.token</span>
<span class="line">  <span class="token comment">#nomad deploy에 필요한 token 전달  </span></span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> nomad.token    </span>
<span class="line">  <span class="token key atrule">tags</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> dpt<span class="token punctuation">-</span>runner<span class="token punctuation">-</span><span class="token number">1</span>       </span>
<span class="line"></span>
<span class="line"><span class="token key atrule">nomad-run-job</span><span class="token punctuation">:</span>      </span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy  </span>
<span class="line">  <span class="token comment">#environment: production</span></span>
<span class="line">  <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.gitlab.com/internetarchive/nomad/master</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">    source nomad.token</span></span>
<span class="line"></span>
<span class="line">    cd nomad_job</span>
<span class="line">    chmod +x ./nomad</span>
<span class="line">    cat &lt;&lt;EOF <span class="token punctuation">&gt;</span> dev.env</span>
<span class="line">    spring_image = &quot;$ecr_url<span class="token punctuation">:</span>$CI_COMMIT_SHORT_SHA&quot;</span>
<span class="line">    ecr_login = &quot;$ecr_login&quot;</span>
<span class="line">    spring_port = 8081</span>
<span class="line">    vault_policy = &quot;vault_and_spring&quot;</span>
<span class="line">    env = &quot;dev&quot;</span>
<span class="line">    dc = &quot;dc1&quot;</span>
<span class="line">    EOF</span>
<span class="line">    </span>
<span class="line">    export NOMAD_ADDR=https<span class="token punctuation">:</span>//$Nomad_URL<span class="token punctuation">:</span><span class="token number">4646</span></span>
<span class="line">    <span class="token comment">#export NOMAD_TOKEN=$NOMAD_TOKEN</span></span>
<span class="line">    ./nomad run <span class="token punctuation">-</span>var<span class="token punctuation">-</span>file=&quot;dev.env&quot; vault_spring.nomad </span>
<span class="line">  <span class="token key atrule">tags</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> dpt<span class="token punctuation">-</span>runner<span class="token punctuation">-</span><span class="token number">1</span>    </span>
<span class="line"></span></code></pre></div><ol start="4"><li>결과 확인</li></ol><ul><li><p>pipe line은 성공적으로 완료되었습니다.<br><img src="`+p+'" alt="" loading="lazy"></p></li><li><p>Nomad에서도 배포가 완료되었습니다.<br><img src="'+e+'" alt="" loading="lazy"></p></li></ul><ol start="5"><li>마치며</li></ol><p>Nomad에서도 Terraform과 마찬가지로 변수를 사용할 수 있으며, 이를 통해 보안 값을 관리할 수 있습니다. 하지만, Secret는 가능한 한 최소한으로 노출해야 하며, 이를 위한 인증과 인가 과정이 명확하고 논리적으로 설정되어야 합니다.</p><p>이러한 환경에서 Vault를 사용하면 Secret에 대한 노출을 줄이고, 안전한 방식으로 인증 및 인가 과정을 처리할 수 있습니다. Vault를 통해 Secret을 안전하게 저장하고 관리하면서도, Nomad와 Terraform 같은 도구에서 이를 동적으로 불러오는 구조는 보안성과 유연성을 동시에 제공합니다.</p><p>DevSecOps의 세계는 복잡하고 넓지만, Vault와 같은 솔루션을 활용하면 구축 과정이 더 효율적이고 안전한 파이프라인을 제공할 수 있습니다. 이로 인해 전체 시스템의 보안이 강화되면서도 관리가 용이해지며, 조직의 보안 표준을 유지하면서 DevOps 파이프라인을 최적화할 수 있습니다.</p>',23),c=[o];function i(u,r){return a(),s("div",null,c)}const m=n(l,[["render",i],["__file","gitlabci-with-vault.html.vue"]]),g=JSON.parse('{"path":"/04-HashiCorp/06-Vault/04-UseCase/gitlabci-with-vault.html","title":"Gitlab 파이프라인의 Secret을 Vault로 관리","lang":"ko-KR","frontmatter":{"head":[["meta",{"name":"Gitlab 파이프라인의 Secret을 Vault로 관리","content":"Gitlab CI, Vault, Nomad를 통한 DevSecOps 배포 파이프라인 구현"}],["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/gitlabci-with-vault.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Gitlab 파이프라인의 Secret을 Vault로 관리"}],["meta",{"property":"og:description","content":"Gitlab 파이프라인의 Secret을 Vault로 관리 Vault 설정 참고 링크: Hashicorp 공홈 Nomad Vault 연동 참고 링크: docmoa Application을 배포할때 우리는 Application의 Secret만 관리하는 것이 아닌, CI또는 CD 단계에서 사용되는 Secret의 정보 또한 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-09-18T09:45:16.000Z"}],["meta",{"property":"article:author","content":"unghee"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"nomad"}],["meta",{"property":"article:tag","content":"gitlab"}],["meta",{"property":"article:tag","content":"gitlab-ci"}],["meta",{"property":"article:modified_time","content":"2024-09-18T09:45:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gitlab 파이프라인의 Secret을 Vault로 관리\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-18T09:45:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"unghee\\"}]}"]],"author":"unghee","tag":["vault","nomad","gitlab","gitlab-ci"],"description":"Gitlab 파이프라인의 Secret을 Vault로 관리 Vault 설정 참고 링크: Hashicorp 공홈 Nomad Vault 연동 참고 링크: docmoa Application을 배포할때 우리는 Application의 Secret만 관리하는 것이 아닌, CI또는 CD 단계에서 사용되는 Secret의 정보 또한 ..."},"headers":[],"git":{"createdTime":1726652716000,"updatedTime":1726652716000,"contributors":[{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":6.88,"words":413},"filePathRelative":"04-HashiCorp/06-Vault/04-UseCase/gitlabci-with-vault.md","localizedDate":"2024년 9월 18일","excerpt":"\\n<blockquote>\\n<p>Vault 설정 참고 링크: <a href=\\"https://developer.hashicorp.com/well-architected-framework/security/security-cicd-vault\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Hashicorp 공홈</a></p>\\n</blockquote>\\n<blockquote>\\n<p>Nomad Vault 연동 참고 링크: <a href=\\"https://docmoa.github.io/04-HashiCorp/07-Nomad/04-UseCase/spring-boot-with-vaultandNomad.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">docmoa</a></p>\\n</blockquote>","copyright":{"author":"unghee"},"autoDesc":true}');export{m as comp,g as data};
