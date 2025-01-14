import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},i=e(`<h1 id="sentinel-identity-cidr" tabindex="-1"><a class="header-anchor" href="#sentinel-identity-cidr"><span>Sentinel - (Identity &amp; CIDR)</span></a></h1><blockquote><p>Enterprise 기능</p></blockquote><p>Token Role에 <code>bound_cidr</code>을 적용하거나 여타 인증(AppRole, Userpass 등)에 허용하는 cidr을 적용하는 경우 다시 Token을 발급하거나 인증받지 않는한은 cidr을 기반으로한 차단을 동적으로 적용할 수 없다.</p><p>이경우 Sentinel을 사용하여 동적인 정책을 적용할 수 있다. Sentinel은 ACL방식의 기존 <code>Policy</code>와는 달리 Path가 아닌 다른 검증 조건을 추가할 수 있다.</p><ul><li><p>예제 (GitHub) : <a href="https://github.com/hashicorp/vault-guides/blob/master/governance/sentinel/README.md" target="_blank" rel="noopener noreferrer">https://github.com/hashicorp/vault-guides/blob/master/governance/sentinel/README.md</a></p></li><li><p>엔터프라이즈 Trial 신청 (30일) : <a href="https://www.hashicorp.com/products/vault/trial" target="_blank" rel="noopener noreferrer">https://www.hashicorp.com/products/vault/trial</a></p></li></ul><h2 id="테스트-사용자-생성" tabindex="-1"><a class="header-anchor" href="#테스트-사용자-생성"><span>테스트 사용자 생성</span></a></h2><p>Sentinel 적용을 확인하기 위해 모든 권한이 있는 기존 <code>Policy</code> 방식의 정책을 생성한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault policy <span class="token function">write</span> super-user - <span class="token operator">&lt;&lt;</span> <span class="token string">EOF</span>
<span class="line">path &quot;*&quot; {</span>
<span class="line">capabilities = [&quot;create&quot;, &quot;read&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;list&quot;, &quot;sudo&quot;]</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre></div><p>생성한 정책고 앞으로 생성할 Sentinel 정책이 포함된 사용자를 생성한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault <span class="token function">write</span> auth/userpass/users/admin <span class="token assign-left variable">password</span><span class="token operator">=</span>password <span class="token assign-left variable">policies</span><span class="token operator">=</span><span class="token string">&quot;super-user, test-rgp&quot;</span></span>
<span class="line">vault <span class="token function">write</span> auth/userpass/users/rgp <span class="token assign-left variable">password</span><span class="token operator">=</span>password <span class="token assign-left variable">policies</span><span class="token operator">=</span><span class="token string">&quot;super-user, test-rgp&quot;</span></span>
<span class="line"></span></code></pre></div><p><code>admin</code>과 <code>rgp</code> 사용자 모두 동일한 정책을 부여 받았다. Sentinel에서는 <code>identity</code> 정보를 기반으로 조건을 부여할 수 있으며, 동일한 정책이 부여되었더라도 어떤 <code>identity</code> 인가에 따라 적용 여부를 선택적으로 검증할 수 있다.</p><p>각 사용자로 로그인하여 Token 정보를 확인하면 <code>entity_id</code> 값을 확인할 수 있다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ <span class="token assign-left variable">TOKEN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>vault login <span class="token parameter variable">-field</span><span class="token operator">=</span>token <span class="token parameter variable">-method</span> userpass <span class="token assign-left variable">username</span><span class="token operator">=</span>admin <span class="token assign-left variable">password</span><span class="token operator">=</span>password<span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">$ vault token lookup <span class="token variable">$TOKEN</span></span>
<span class="line"></span>
<span class="line">Key                 Value</span>
<span class="line">---                 -----</span>
<span class="line">display_name        userpass-admin</span>
<span class="line">entity_id           <span class="token number">17230158</span>-d0ad-dd6d-b749-3c7de9e2b4cf</span>
<span class="line">policies            <span class="token punctuation">[</span>default super-user test-rgp<span class="token punctuation">]</span></span>
<span class="line">renewable           <span class="token boolean">true</span></span>
<span class="line">ttl                 768h</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sentinel-생성" tabindex="-1"><a class="header-anchor" href="#sentinel-생성"><span>Sentinel 생성</span></a></h2><p>다음과 같이 적용할 <code>identity-cidr-check.sentinel</code> 파일을 생성한다. (확장자는 다른 확장자를 사용해도 무방하다. e.g. hcl)</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">import <span class="token string">&quot;sockaddr&quot;</span></span>
<span class="line">import <span class="token string">&quot;strings&quot;</span></span>
<span class="line"></span>
<span class="line">print(identity.entity.id)</span>
<span class="line">print(request.connection.remote_addr)</span>
<span class="line"></span>
<span class="line"><span class="token property">precond</span> <span class="token punctuation">=</span> <span class="token keyword">rule</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment"># admin user</span></span>
<span class="line">    <span class="token comment"># identity.entity.id is &quot;17230158-d0ad-dd6d-b749-3c7de9e2b4cf&quot; or</span></span>
<span class="line">    <span class="token comment"># rgp user</span></span>
<span class="line">    identity.entity.id is <span class="token string">&quot;31cc28c0-9fd0-82b3-a70d-0eef741c5349&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token property">cidrcheck</span> <span class="token punctuation">=</span> <span class="token keyword">rule</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">## Loopback</span></span>
<span class="line">    <span class="token comment"># sockaddr.is_contained(&quot;127.0.0.0/8&quot;, request.connection.remote_addr) or </span></span>
<span class="line">    sockaddr.is_contained(<span class="token string">&quot;22.32.4.0/24&quot;</span>, request.connection.remote_addr)</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token property">main</span> <span class="token punctuation">=</span> rule when <span class="token keyword">precond</span> <span class="token punctuation">{</span></span>
<span class="line">    cidrcheck</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>precond : main 규칙에서 조건으로 부여할 규칙을 정의한다. <ul><li><code>identity.entity.id</code>로 검증할 아이디 내용에는 앞서 확인한 <code>admin</code>과 <code>rgp</code> 사용자의 <code>entity_id</code>를 조건에 넣는다.</li><li><code>admin</code> 사용자의 경우 우선 주석처리하여 진행한다.</li></ul></li><li>cidrcheck : cidr을 검증할 규칙을 정의한다.</li></ul><p>적용하는 방식은 다음과 같다.</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">POLICY=$(base64 identity-cidr-check.sentinel)</span>
<span class="line"></span>
<span class="line">vault write sys/policies/rgp/test-rgp \\</span>
<span class="line">      policy=&quot;\${POLICY}&quot; \\</span>
<span class="line">      enforcement_level=&quot;hard-mandatory&quot;</span>
<span class="line"></span></code></pre></div><h2 id="sentinel-검증" tabindex="-1"><a class="header-anchor" href="#sentinel-검증"><span>Sentinel 검증</span></a></h2><p><code>admin</code> 사용자로 로그인하여 kv를 생성하고 값을 넣는다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ vault login <span class="token parameter variable">-method</span> userpass <span class="token assign-left variable">username</span><span class="token operator">=</span>admin <span class="token assign-left variable">password</span><span class="token operator">=</span>password</span>
<span class="line">$ vault secrets <span class="token builtin class-name">enable</span> kv</span>
<span class="line">$ vault kv put kv/hello <span class="token assign-left variable">foo</span><span class="token operator">=</span>bar</span>
<span class="line">$ vault kv get kv/hello</span>
<span class="line"><span class="token operator">==</span><span class="token operator">=</span> Data <span class="token operator">==</span><span class="token operator">=</span></span>
<span class="line">Key    Value</span>
<span class="line">---    -----</span>
<span class="line">foo    bar</span>
<span class="line"></span></code></pre></div><p><code>rgp</code> 사용자로 로그인하여 kv를 조회해본다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ vault login <span class="token parameter variable">-method</span> userpass <span class="token assign-left variable">username</span><span class="token operator">=</span>rgp <span class="token assign-left variable">password</span><span class="token operator">=</span>password</span>
<span class="line">$ vault kv get kv/hello</span>
<span class="line">Error making API request.</span>
<span class="line"></span>
<span class="line">URL: GET http://127.0.0.1:8200/v1/sys/internal/ui/mounts/kv/hello</span>
<span class="line">Code: <span class="token number">400</span>. Errors:</span>
<span class="line"></span>
<span class="line">* <span class="token number">2</span> errors occurred:</span>
<span class="line">	* rgp standard policy <span class="token string">&quot;root/test-rgp&quot;</span> evaluation resulted <span class="token keyword">in</span> denial.</span>
<span class="line"></span>
<span class="line">The specific error was:</span>
<span class="line"><span class="token operator">&lt;</span>nil<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line">A trace of the execution <span class="token keyword">for</span> policy <span class="token string">&quot;root/test-rgp&quot;</span> is available:</span>
<span class="line"></span>
<span class="line">Result: <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">Description: <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line">print<span class="token punctuation">(</span><span class="token punctuation">)</span> output:</span>
<span class="line"></span>
<span class="line">31cc28c0-9fd0-82b3-a70d-0eef741c5349</span>
<span class="line"><span class="token number">127.0</span>.0.1</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">Rule <span class="token string">&quot;main&quot;</span> <span class="token punctuation">(</span>root/test-rgp:19:1<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">Rule <span class="token string">&quot;cidrcheck&quot;</span> <span class="token punctuation">(</span>root/test-rgp:14:1<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">Rule <span class="token string">&quot;precond&quot;</span> <span class="token punctuation">(</span>root/test-rgp:7:1<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">	* permission denied</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cidrcheck 에서 검증하는 cidr에 속하지 못하면 요청 단계에서 권한이 없음을 표기한다.</p><h2 id="identity-동적으로-변경하기" tabindex="-1"><a class="header-anchor" href="#identity-동적으로-변경하기"><span>identity 동적으로 변경하기</span></a></h2><p>앞서 작성한 sentinel 규칙에서 <code>admin</code> 사용자의 <code>identity.id</code>의 주석을 해제하여 다시 적용해 본다.</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">...생략...</span>
<span class="line"></span>
<span class="line"><span class="token property">precond</span> <span class="token punctuation">=</span> <span class="token keyword">rule</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment"># admin user</span></span>
<span class="line highlighted">    identity.entity.id is <span class="token string">&quot;17230158-d0ad-dd6d-b749-3c7de9e2b4cf&quot;</span> or</span>
<span class="line">    <span class="token comment"># rgp user</span></span>
<span class="line">    identity.entity.id is <span class="token string">&quot;31cc28c0-9fd0-82b3-a70d-0eef741c5349&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">...생략...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>admin</code> 사용자로 로그인하여 kv를 조회해도 cidr 조건에 맞지 않으면 동일한 오류가 발생한다.</p><h2 id="cidr-동적으로-변경하기" tabindex="-1"><a class="header-anchor" href="#cidr-동적으로-변경하기"><span>cidr 동적으로 변경하기</span></a></h2><p>허용하는 cidr을 추가해본다. 로컬에서 테스트하는 경우 <code>127.0.0.1</code>이 해당 ip가 될 수 있다.</p><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">...생략...</span>
<span class="line"></span>
<span class="line"><span class="token property">cidrcheck</span> <span class="token punctuation">=</span> <span class="token keyword">rule</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">    <span class="token comment">## Loopback</span></span>
<span class="line">    sockaddr.is_contained(<span class="token string">&quot;127.0.0.0/8&quot;</span>, request.connection.remote_addr) or </span>
<span class="line">    sockaddr.is_contained(<span class="token string">&quot;22.32.4.0/24&quot;</span>, request.connection.remote_addr)</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">...생략...</span>
<span class="line"></span></code></pre></div><p>적용 후 <code>admin</code> 사용자와 <code>rgp</code> 사용자 모두 정상적으로 kv의 값을 확인할 수 있다.</p>`,33),t=[i];function p(c,o){return n(),a("div",null,t)}const u=s(l,[["render",p],["__file","sentinel-check-identity-cidr.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/06-Vault/04-UseCase/sentinel-check-identity-cidr.html","title":"Sentinel - (Identity & CIDR)","lang":"ko-KR","frontmatter":{"description":"Sentinel을 사용하여 identity 조건에 cidr 검사","tag":["vault","sentinel","cidr","enterprise"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/sentinel-check-identity-cidr.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Sentinel - (Identity & CIDR)"}],["meta",{"property":"og:description","content":"Sentinel을 사용하여 identity 조건에 cidr 검사"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"sentinel"}],["meta",{"property":"article:tag","content":"cidr"}],["meta",{"property":"article:tag","content":"enterprise"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Sentinel - (Identity & CIDR)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"테스트 사용자 생성","slug":"테스트-사용자-생성","link":"#테스트-사용자-생성","children":[]},{"level":2,"title":"Sentinel 생성","slug":"sentinel-생성","link":"#sentinel-생성","children":[]},{"level":2,"title":"Sentinel 검증","slug":"sentinel-검증","link":"#sentinel-검증","children":[]},{"level":2,"title":"identity 동적으로 변경하기","slug":"identity-동적으로-변경하기","link":"#identity-동적으로-변경하기","children":[]},{"level":2,"title":"cidr 동적으로 변경하기","slug":"cidr-동적으로-변경하기","link":"#cidr-동적으로-변경하기","children":[]}],"git":{"createdTime":1668567247000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":3}]},"readingTime":{"minutes":6.58,"words":395},"filePathRelative":"04-HashiCorp/06-Vault/04-UseCase/sentinel-check-identity-cidr.md","localizedDate":"2022년 11월 16일","excerpt":"\\n<blockquote>\\n<p>Enterprise 기능</p>\\n</blockquote>\\n<p>Token Role에 <code>bound_cidr</code>을 적용하거나 여타 인증(AppRole, Userpass 등)에 허용하는 cidr을 적용하는 경우 다시 Token을 발급하거나 인증받지 않는한은 cidr을 기반으로한 차단을 동적으로 적용할 수 없다.</p>\\n<p>이경우 Sentinel을 사용하여 동적인 정책을 적용할 수 있다. Sentinel은 ACL방식의 기존 <code>Policy</code>와는 달리 Path가 아닌 다른 검증 조건을 추가할 수 있다.</p>"}');export{u as comp,v as data};
