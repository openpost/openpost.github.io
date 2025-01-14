import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as e}from"./app-DhMJQ1_3.js";const l="/assets/vaultandnomad2-B4M_UDMH.png",p="/assets/vaultandnomad3-CMOR_Svb.png",t="/assets/vaultandnomad1-C0McbJTP.png",i="/assets/vaultandnomad4-BLW_l25l.png",o={},c=e(`<h1 id="vault로-spring-boot-구성관리-nomad-version" tabindex="-1"><a class="header-anchor" href="#vault로-spring-boot-구성관리-nomad-version"><span>Vault로 Spring Boot 구성관리 Nomad Version</span></a></h1><blockquote><p>token, app-role로 관리: <a href="https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot.html" target="_blank" rel="noopener noreferrer">docmoa</a></p></blockquote><blockquote><p>aws-auth로 관리: <a href="https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot-with-vault.html" target="_blank" rel="noopener noreferrer">docmoa</a></p></blockquote><p>Spring Boot에서는 <strong>Token, AppRole</strong> 외에도 <strong>AWS Auth</strong>를 통해 시크릿을 주입할 수 있습니다. AWS Auth 방식은 <strong>AWS IAM과 EC2 Tag</strong>를 기반으로 인증 및 권한 부여 과정을 간소화하는 장점이 있습니다.</p><p>하지만 AWS Auth의 단점은 <strong>AWS에 종속</strong>된다는 점과, <strong>IAM 권한 설정</strong> 과정이 복잡해져 관리가 어려워질 수 있다는 것입니다. IAM 정책 및 권한을 잘못 설정하면 보안 취약점이 발생하거나 접근이 제대로 이루어지지 않는 문제를 겪을 수 있습니다.</p><p>그래서 이에 대한 해결책으로 <strong>Nomad를 통해 Vault와 통합하여 애플리케이션을 관리</strong>하는 방식을 제안드립니다. Nomad를 사용하면 애플리케이션의 배포와 Vault 인증, 권한 부여 과정이 Nomad와 Vault 간에만 처리되며, 개발자는 이를 신경 쓰지 않고 배포를 관리할 수 있습니다.</p><p>Nomad와 Vault의 통합을 통해 인증과 인가를 자동화하고 관리 복잡성을 줄이는 방법을 아래 테스트에서 함께 살펴보시죠.</p><p>먼저 아래 두가지 방식이 있을 것 같습니다.</p><ul><li>token만 치환하면 되는 상황</li><li>secret을 받아오고 Nomad job에 주입하는 방식</li></ul><p>처음 거는 Spring boot app으로 진행 할 것이며, 두번째는 keycloak env를 관리하는 것으로 진행하도록 하겠습니다.</p><ol><li>Vault Secret 설정</li></ol><ul><li>Vault Secret은 아래와 같이 설정했습니다. <ul><li>vault_token_auth_backend_role.nomad_cluster에서는 Nomad Cluster의 적용 될 token의 role 설정입니다.</li><li>vault_policy.admin에서는 Nomad Cluster에서 token을 인증인가 받는 권한이 설정됩니다.</li><li>vault_policy.vault_and_spring에서는 Nomad job에서 사용 할 Secret의 Path의 권한을 설정합니다.</li><li>vault_kv_secret_v2.keycloak_env에서는 keycloak에서 사용되는 환경변수를 관리합니다.</li></ul></li></ul><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#Nomad Cluster의 적용 될 policy와 job에서 사용 될 policy를 role에 설정합니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_token_auth_backend_role&quot;</span></span> <span class="token string">&quot;nomad_cluster&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">allowed_policies</span>        <span class="token punctuation">=</span> <span class="token punctuation">[</span>vault_policy.admin.name,vault_policy.vault_and_spring.name<span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">orphan</span>                  <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">token_period</span>            <span class="token punctuation">=</span> <span class="token number">94608000</span></span>
<span class="line">  <span class="token property">renewable</span>               <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">token_explicit_max_ttl</span>  <span class="token punctuation">=</span> <span class="token number">0</span>    </span>
<span class="line">  <span class="token property">role_name</span>               <span class="token punctuation">=</span> <span class="token string">&quot;nomad-admin&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Admin 정책 생성</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_policy&quot;</span></span> <span class="token string">&quot;admin&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad-admin&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">policy</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOT</span>
<span class="line"># Read system health check</span>
<span class="line">path &quot;sys/health&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># List existing policies</span>
<span class="line">path &quot;sys/policies/acl&quot; {</span>
<span class="line">  capabilities = [&quot;list&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># Create and manage ACL policies</span>
<span class="line">path &quot;sys/policies/acl/*&quot; {</span>
<span class="line">  capabilities = [&quot;create&quot;, &quot;read&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;list&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># Manage auth methods broadly across Vault</span>
<span class="line">path &quot;auth/*&quot; {</span>
<span class="line">  capabilities = [&quot;create&quot;, &quot;read&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;list&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># Create, update, and delete auth methods</span>
<span class="line">path &quot;sys/auth/*&quot; {</span>
<span class="line">  capabilities = [&quot;create&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># List auth methods</span>
<span class="line">path &quot;sys/auth&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># List, create, update, and delete key/value secrets</span>
<span class="line">path &quot;nomad-job/*&quot; {</span>
<span class="line">  capabilities = [&quot;create&quot;, &quot;read&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;list&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># Manage secrets engines</span>
<span class="line">path &quot;sys/mounts/*&quot; {</span>
<span class="line">  capabilities = [&quot;create&quot;, &quot;read&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;list&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"># List existing secrets engines.</span>
<span class="line">path &quot;sys/mounts&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;]</span>
<span class="line">}</span>
<span class="line">EOT</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#application에서 접근 시 사용 되는 policy입니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_policy&quot;</span></span> <span class="token string">&quot;vault_and_spring&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;vault_and_spring&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">policy</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOT</span>
<span class="line">path &quot;mzc-spring/data/java_and_vault&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;,&quot;update&quot;,&quot;create&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">path &quot;mzc-spring/data/java_and_vault/dev&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;,&quot;update&quot;,&quot;create&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">EOT</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Token 생성</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_token&quot;</span></span> <span class="token string">&quot;admin_token&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">policies</span>  <span class="token punctuation">=</span> <span class="token punctuation">[</span>vault_policy.admin.name<span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">period</span>    <span class="token punctuation">=</span> <span class="token string">&quot;36500h&quot;</span> <span class="token comment"># 36500시간 (약 4년)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Vault에 KV secret engine 마운트</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_mount&quot;</span></span> <span class="token string">&quot;nomad-job&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">path</span>    <span class="token punctuation">=</span> <span class="token string">&quot;nomad-job&quot;</span></span>
<span class="line">  <span class="token property">type</span>    <span class="token punctuation">=</span> <span class="token string">&quot;kv&quot;</span></span>
<span class="line">  <span class="token property">options</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span> <span class="token property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># sample로 보게 될 keycloak secret 입니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_kv_secret_v2&quot;</span></span> <span class="token string">&quot;keycloak_env&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">mount</span>               <span class="token punctuation">=</span> vault_mount.nomad-job.path</span>
<span class="line">  <span class="token property">name</span>                <span class="token punctuation">=</span> <span class="token string">&quot;keycloak/config&quot;</span></span>
<span class="line">  <span class="token property">cas</span>                 <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">  <span class="token property">delete_all_versions</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token property">data_json</span> <span class="token punctuation">=</span> jsonencode(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">KEYCLOAK_ADMIN</span>                   <span class="token punctuation">=</span> <span class="token string">&quot;id&quot;</span>,</span>
<span class="line">    <span class="token property">KEYCLOAK_ADMIN_PASSWORD</span>          <span class="token punctuation">=</span> <span class="token string">&quot;passowrd&quot;</span>,</span>
<span class="line">    <span class="token property">KEYCLOAK_BASE_URL</span>                <span class="token punctuation">=</span> <span class="token string">&quot;/realms/master/hostname-debug&quot;</span>,</span>
<span class="line">    <span class="token property">KC_HOSTNAME_DEBUG</span>                <span class="token punctuation">=</span> <span class="token boolean">true</span>,</span>
<span class="line">    <span class="token property">KC_HOSTNAME_STRICT</span>               <span class="token punctuation">=</span> <span class="token boolean">true</span>,</span>
<span class="line">    <span class="token property">KC_HOSTNAME</span>                      <span class="token punctuation">=</span> <span class="token string">&quot;keycloak.domain&quot;</span>,</span>
<span class="line">    <span class="token property">KC_HOSTNAME_STRICT_HTTPS</span>         <span class="token punctuation">=</span> <span class="token boolean">true</span>,</span>
<span class="line">    <span class="token property">KC_HTTP_ENABLED</span>                  <span class="token punctuation">=</span> <span class="token boolean">false</span>,</span>
<span class="line">    <span class="token property">KC_HTTPS_CERTIFICATE_FILE</span>        <span class="token punctuation">=</span> <span class="token string">&quot;/etc/x509/https/keycloak.crt&quot;</span>,</span>
<span class="line">    <span class="token property">KC_HTTPS_CERTIFICATE_KEY_FILE</span>    <span class="token punctuation">=</span> <span class="token string">&quot;/etc/x509/https/keycloak.key&quot;</span>,</span>
<span class="line">    <span class="token property">QUARKUS_HTTP_HOST</span>                <span class="token punctuation">=</span> <span class="token string">&quot;0.0.0.0&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>Nomad 설정</li></ol><ul><li>Nomad Server와 Client에 다음과 같은 설정이 추가됩니다.</li></ul><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment"># Nomad Server /etc/nomad.d/nomad.hcl</span></span>
<span class="line">...</span>
<span class="line"><span class="token keyword">vault</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token property">address</span> <span class="token punctuation">=</span> <span class="token string">&quot;vault Server url:port&quot;</span></span>
<span class="line">    <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;admin&quot;</span></span>
<span class="line">    <span class="token property">create_from_role</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad-admin&quot;</span></span>
<span class="line">    <span class="token property">token</span> <span class="token punctuation">=</span> <span class="token string">&quot;1번에서 생성한 token&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">...</span>
<span class="line"><span class="token comment"># Nomad Client /etc/nomad.d/nomad.hcl</span></span>
<span class="line"><span class="token keyword">vault</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">enabled</span>   <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">address</span>   <span class="token punctuation">=</span> <span class="token string">&quot;vault Server url:port&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">...</span>
<span class="line"></span></code></pre></div><ol start="3"><li>Nomad job에서 Secret 설정</li></ol><ul><li>Nomad는 배포를 job이라는 형식을 통해서 배포합니다.</li><li>배포를 진행할때 Vault에 있는 Secret을 file화 하거나 환경변수에 넣을 수 있습니다.</li><li>keycloak app에서 어떤식으로 적용되는 지 같이 살펴보시죠.</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">job &quot;keycloak&quot; {</span>
<span class="line">  type = &quot;service&quot;</span>
<span class="line">  datacenters = [&quot;dc1&quot;]</span>
<span class="line"></span>
<span class="line">  group &quot;keycloak&quot; {</span>
<span class="line">    count = 1</span>
<span class="line">....................       </span>
<span class="line">    </span>
<span class="line">    task &quot;keycloak&quot; {</span>
<span class="line">      driver = &quot;docker&quot;</span>
<span class="line">  </span>
<span class="line">      config {</span>
<span class="line">        image = &quot;quay.io/keycloak/keycloak:24.0.0&quot;</span>
<span class="line">        args = [&quot;start&quot;,</span>
<span class="line">        &quot;--optimized&quot;,</span>
<span class="line">        &quot;--https-port=9443&quot;]</span>
<span class="line">        volumes = [</span>
<span class="line">          &quot;local/keycloak.conf:/etc/keycloak.conf&quot;,</span>
<span class="line">        ] </span>
<span class="line">        ports = [&quot;http&quot;]</span>
<span class="line"></span>
<span class="line">      }</span>
<span class="line">      #Vault의 policy를 지정합니다.</span>
<span class="line">      vault {</span>
<span class="line">        policies  = [&quot;nomad-admin&quot;]</span>
<span class="line">        change_mode   = &quot;signal&quot;</span>
<span class="line">        change_signal = &quot;SIGINT&quot;</span>
<span class="line">      }</span>
<span class="line">      #데이터를 받아 올 secret의 path를 지정하고 모든 key, value를 key=value로 치환합니다.</span>
<span class="line">      template {</span>
<span class="line">        data = &lt;&lt;EOH</span>
<span class="line">    {{- with secret &quot;nomad-job/data/keycloak/config&quot; }}</span>
<span class="line">    {{- range $key, $value := .Data.data }}</span>
<span class="line">    {{ $key }}=&quot;{{ $value }}&quot;</span>
<span class="line">    {{- end }}</span>
<span class="line">    {{- end }}</span>
<span class="line">    EOH</span>
<span class="line"></span>
<span class="line">        destination = &quot;secrets/file.env&quot;</span>
<span class="line">        env         = true</span>
<span class="line">     }      </span>
<span class="line">....................      </span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>배포 확인</li></ol><ul><li><p>먼저 secret한 값들은 유저가 알지 못해야 하며, 확인도 할 수 없어야 합니다.</p></li><li><p>배포대상(container 또는 서버)에 접근한다면 확인이 가능합니다. 이 행위 자체는 이미 보안적인 이슈가 생긴 상황이나 긴급한 상황일 경우일 것입니다.</p></li><li><p>nomad ui에서는 env 파일을 읽을 수 없습니다.<br><img src="`+l+'" alt="" loading="lazy"></p></li><li><p>nomad ui에서는 token 또한 읽을 수 없습니다.<br><img src="'+p+'" alt="" loading="lazy"></p></li><li><p>Container에 다이렉트로 접근해야 만 env를 확인 할 수 있습니다.<br><img src="'+t+`" alt="" loading="lazy"></p></li></ul><ol start="5"><li>미리 Application에 Token만 주입하면 되는 상황</li></ol><ul><li>이미 <a href="https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot.html" target="_blank" rel="noopener noreferrer">docmoa</a>에서 알아 본 Token방식의 인증 일 경우는 CI/CD에서 Token을 주입해야합니다.</li><li>만약 Nomad로 배포하면 이러한 Token 또한 Nomad가 주입, 로테이트까지 진행해줍니다.</li><li>keycloak sample과 다르게 매우 단순합니다. token만 주입하면 되기 때문입니다.</li><li>먼저 지난 yaml을 한번 더 확인해보겠습니다.</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">spring:</span>
<span class="line">  cloud:</span>
<span class="line">    vault:</span>
<span class="line">      host: vault_url</span>
<span class="line">      port: 8200</span>
<span class="line">      scheme: https</span>
<span class="line">      namespace: admin</span>
<span class="line">      authentication: TOKEN</span>
<span class="line">      application-name: java_and_vault</span>
<span class="line">      # VAULT_TOKEN이라는 환경변수의 Vault token만 있으면 됩니다.</span>
<span class="line">      token: \${VAULT_TOKEN:root}</span>
<span class="line">      # profiles: dev</span>
<span class="line">      generic:</span>
<span class="line">        enabled: false</span>
<span class="line">      kv:</span>
<span class="line">        enabled: true</span>
<span class="line">        backend: mzc-spring</span>
<span class="line">        profile-separator: /</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>spring.cloud.vault.token에 환경변수로 VAULT_TOKEN만 있으면 되는 상황입니다.</p></li><li><p>해당 토큰만 있다면 나머지 Secret은 spring.cloud.vault.kv.backend 설정에 따라 불러 올 수 있는 상황입니다.</p></li><li><p>다음은 Nomad job입니다.</p></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">job &quot;vault_and_spring&quot; {</span>
<span class="line">  type = &quot;service&quot;</span>
<span class="line">  datacenters = [&quot;dc1&quot;]</span>
<span class="line"></span>
<span class="line">  group &quot;vault_and_spring&quot; {</span>
<span class="line">    count = 1</span>
<span class="line">    </span>
<span class="line">    service {</span>
<span class="line">      name = &quot;spring&quot;</span>
<span class="line">      tags = [&quot;vault&quot;,&quot;spring&quot;]</span>
<span class="line">      provider = &quot;nomad&quot;</span>
<span class="line">      check {</span>
<span class="line">        type  = &quot;tcp&quot;</span>
<span class="line">        interval = &quot;20s&quot;</span>
<span class="line">        timeout  = &quot;2s&quot;</span>
<span class="line">        port  = &quot;vault_and_spring&quot;</span>
<span class="line">      }      </span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    network {</span>
<span class="line">      port &quot;vault_and_spring&quot; {</span>
<span class="line">        static  = 8081</span>
<span class="line">        to      = 8081</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">    task &quot;ecr-login&quot; {</span>
<span class="line">      driver = &quot;raw_exec&quot;</span>
<span class="line"></span>
<span class="line">      config {</span>
<span class="line">        command = &quot;/bin/bash&quot;</span>
<span class="line">        args    = [&quot;local/ecr-login.sh&quot;]</span>
<span class="line">      }</span>
<span class="line">      template {</span>
<span class="line">        data = &lt;&lt;EOH</span>
<span class="line">aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin account.dkr.ecr.ap-northeast-2.amazonaws.com</span>
<span class="line">cat /root/.docker/config.json</span>
<span class="line">EOH</span>
<span class="line">    destination = &quot;local/ecr-login.sh&quot;</span>
<span class="line">      }</span>
<span class="line"></span>
<span class="line">      resources {</span>
<span class="line">        cpu    = 100</span>
<span class="line">        memory = 256</span>
<span class="line">      }</span>
<span class="line"></span>
<span class="line">      lifecycle {</span>
<span class="line">        hook   = &quot;prestart&quot;</span>
<span class="line">        sidecar = false</span>
<span class="line">      }</span>
<span class="line">    }    </span>
<span class="line">      </span>
<span class="line">    task &quot;vault_and_spring&quot; {</span>
<span class="line">      driver = &quot;docker&quot;</span>
<span class="line">  </span>
<span class="line">      config {</span>
<span class="line">        image = &quot;account.dkr.ecr.ap-northeast-2.amazonaws.com/vault_and_spring:latest&quot;</span>
<span class="line">        args = [&quot;--spring.profiles.active=dev&quot;] </span>
<span class="line">        ports = [&quot;vault_and_spring&quot;]</span>
<span class="line">      }</span>
<span class="line">      #미리 생성한 Vault token을 기입해줍니다.</span>
<span class="line">      vault {</span>
<span class="line">        policies  = [&quot;vault_and_spring&quot;]</span>
<span class="line">        change_mode   = &quot;signal&quot;</span>
<span class="line">        change_signal = &quot;SIGINT&quot;</span>
<span class="line">      }      </span>
<span class="line">...................</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>keycloak과는 다르게 secret을 env에 넣는 구문이 없습니다.</li></ul><ol start="6"><li>적용 확인</li></ol><ul><li>배포 결과를 확인해봅시다.<br><img src="`+i+'" alt="" loading="lazy"></li><li>이제는 익숙한 url과 db id, password가 잘 찍히고 있습니다.</li></ul>',29),u=[c];function r(d,v){return s(),a("div",null,u)}const q=n(o,[["render",r],["__file","spring-boot-with-vaultandNomad.html.vue"]]),b=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/04-UseCase/spring-boot-with-vaultandNomad.html","title":"Vault로 Spring Boot 구성관리 Nomad Version","lang":"ko-KR","frontmatter":{"head":[["meta",{"name":"Spring Boot with Vault and Nomad","content":"Spring Boot에 구성관리로 Vault로 Application 배포와 인증, 인가는 Nomad"}],["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/04-UseCase/spring-boot-with-vaultandNomad.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Vault로 Spring Boot 구성관리 Nomad Version"}],["meta",{"property":"og:description","content":"Vault로 Spring Boot 구성관리 Nomad Version token, app-role로 관리: docmoa aws-auth로 관리: docmoa Spring Boot에서는 Token, AppRole 외에도 AWS Auth를 통해 시크릿을 주입할 수 있습니다. AWS Auth 방식은 AWS IAM과 EC2 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-09-09T07:35:10.000Z"}],["meta",{"property":"article:author","content":"unghee"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"spring"}],["meta",{"property":"article:tag","content":"nomad"}],["meta",{"property":"article:modified_time","content":"2024-09-09T07:35:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vault로 Spring Boot 구성관리 Nomad Version\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-09T07:35:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"unghee\\"}]}"]],"author":"unghee","tag":["vault","java","spring","nomad"],"description":"Vault로 Spring Boot 구성관리 Nomad Version token, app-role로 관리: docmoa aws-auth로 관리: docmoa Spring Boot에서는 Token, AppRole 외에도 AWS Auth를 통해 시크릿을 주입할 수 있습니다. AWS Auth 방식은 AWS IAM과 EC2 ..."},"headers":[],"git":{"createdTime":1725794798000,"updatedTime":1725867310000,"contributors":[{"name":"ung","email":"ung@mz.co.kr","commits":2}]},"readingTime":{"minutes":11.43,"words":686},"filePathRelative":"04-HashiCorp/07-Nomad/04-UseCase/spring-boot-with-vaultandNomad.md","localizedDate":"2024년 9월 8일","excerpt":"\\n<blockquote>\\n<p>token, app-role로 관리: <a href=\\"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">docmoa</a></p>\\n</blockquote>\\n<blockquote>\\n<p>aws-auth로 관리: <a href=\\"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot-with-vault.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">docmoa</a></p>\\n</blockquote>","copyright":{"author":"unghee"},"autoDesc":true}');export{q as comp,b as data};
