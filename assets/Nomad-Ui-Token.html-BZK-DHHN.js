import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const p="/assets/token_login-CBaI7EPH.png",t="/assets/not_exec-CEumU8bl.png",o={},l=e(`<h1 id="nomad-ui-token" tabindex="-1"><a class="header-anchor" href="#nomad-ui-token"><span>Nomad UI Token</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>해당 Token의 policy는 특정인이 원하여 만들었으며, 더 다양한 제약과 허용을 할 수 있습니다. 해당 policy는 아래와 같은 제약과 허용을 합니다.</p><ol><li>UI에서 exec(job에 접근) 제한</li><li>그 외에 job, node, volume, server등의 모든 화면 읽어오기</li></ol></div><h2 id="nomad-cli" tabindex="-1"><a class="header-anchor" href="#nomad-cli"><span>Nomad cli</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#원하는 권한이 있는 policy file</span></span>
<span class="line">$ <span class="token function">cat</span> nomad-ui-policy.hcl</span>
<span class="line">namespace <span class="token string">&quot;*&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  policy       <span class="token operator">=</span> <span class="token string">&quot;read&quot;</span></span>
<span class="line">  capabilities <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;submit-job&quot;</span>, <span class="token string">&quot;dispatch-job&quot;</span>, <span class="token string">&quot;read-logs&quot;</span>, <span class="token string">&quot;list-jobs&quot;</span>, <span class="token string">&quot;parse-job&quot;</span>, <span class="token string">&quot;read-job&quot;</span>, <span class="token string">&quot;csi-list-volume&quot;</span>, <span class="token string">&quot;csi-read-volume&quot;</span>, <span class="token string">&quot;list-scaling-policies&quot;</span>, <span class="token string">&quot;read-scaling-policy&quot;</span>, <span class="token string">&quot;read-job-scaling&quot;</span>, <span class="token string">&quot;read-fs&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">node</span> <span class="token punctuation">{</span></span>
<span class="line">  policy <span class="token operator">=</span> <span class="token string">&quot;read&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">host_volume <span class="token string">&quot;*&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  policy <span class="token operator">=</span> <span class="token string">&quot;write&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">plugin <span class="token punctuation">{</span></span>
<span class="line">  policy <span class="token operator">=</span> <span class="token string">&quot;read&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#위에서 만든 policy 파일을 nomad cluster에 적용</span></span>
<span class="line">$ nomad acl policy apply <span class="token parameter variable">-description</span> <span class="token string">&quot;Production UI policy&quot;</span> prod-ui nomad-ui-policy.hcl</span>
<span class="line"></span>
<span class="line"><span class="token comment">#해당 policy로 token생성(policy는 여러개를 넣을 수도 있음)</span></span>
<span class="line">$ nomad acl token create <span class="token parameter variable">-name</span><span class="token operator">=</span><span class="token string">&quot;prod ui token&quot;</span> <span class="token parameter variable">-policy</span><span class="token operator">=</span>prod-ui <span class="token parameter variable">-type</span><span class="token operator">=</span>client <span class="token operator">|</span> <span class="token function">tee</span> ui-prod.token</span>
<span class="line"><span class="token comment">#웹 브라우저 로그인을 위해 Secret ID 복사</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nomad-ui" tabindex="-1"><a class="header-anchor" href="#nomad-ui"><span>Nomad UI</span></a></h2><p>아래는 위에서 만들어진 토큰으로 로그인한 화면입니다.<br><img src="`+p+'" alt="TokenLogin" loading="lazy"></p><p>아래 그림과 같이 exec버튼이 비활성화되어 있는 걸 볼 수 있습니다.<br><img src="'+t+'" alt="exec비활성화" loading="lazy"></p>',7),i=[l];function c(r,d){return n(),a("div",null,i)}const k=s(o,[["render",c],["__file","Nomad-Ui-Token.html.vue"]]),g=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/02-Config/Nomad-Ui-Token.html","title":"Nomad UI Token","lang":"ko-KR","frontmatter":{"description":"Nomad ACL","tag":["Nomad","ACL"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/02-Config/Nomad-Ui-Token.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Nomad UI Token"}],["meta",{"property":"og:description","content":"Nomad ACL"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"ACL"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nomad UI Token\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Nomad cli","slug":"nomad-cli","link":"#nomad-cli","children":[]},{"level":2,"title":"Nomad UI","slug":"nomad-ui","link":"#nomad-ui","children":[]}],"git":{"createdTime":1648772616000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"ung","email":"swbs90@naver.com","commits":1}]},"readingTime":{"minutes":2.02,"words":121},"filePathRelative":"04-HashiCorp/07-Nomad/02-Config/Nomad-Ui-Token.md","localizedDate":"2022년 4월 1일","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<p>해당 Token의 policy는 특정인이 원하여 만들었으며, 더 다양한 제약과 허용을 할 수 있습니다. 해당 policy는 아래와 같은 제약과 허용을 합니다.</p>\\n<ol>\\n<li>UI에서 exec(job에 접근) 제한</li>\\n<li>그 외에 job, node, volume, server등의 모든 화면 읽어오기</li>\\n</ol>\\n</div>\\n<h2>Nomad cli</h2>\\n<div class=\\"language-bash\\" data-highlighter=\\"prismjs\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"line\\"><span class=\\"token comment\\">#원하는 권한이 있는 policy file</span></span>\\n<span class=\\"line\\">$ <span class=\\"token function\\">cat</span> nomad-ui-policy.hcl</span>\\n<span class=\\"line\\">namespace <span class=\\"token string\\">\\"*\\"</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  policy       <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"read\\"</span></span>\\n<span class=\\"line\\">  capabilities <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"submit-job\\"</span>, <span class=\\"token string\\">\\"dispatch-job\\"</span>, <span class=\\"token string\\">\\"read-logs\\"</span>, <span class=\\"token string\\">\\"list-jobs\\"</span>, <span class=\\"token string\\">\\"parse-job\\"</span>, <span class=\\"token string\\">\\"read-job\\"</span>, <span class=\\"token string\\">\\"csi-list-volume\\"</span>, <span class=\\"token string\\">\\"csi-read-volume\\"</span>, <span class=\\"token string\\">\\"list-scaling-policies\\"</span>, <span class=\\"token string\\">\\"read-scaling-policy\\"</span>, <span class=\\"token string\\">\\"read-job-scaling\\"</span>, <span class=\\"token string\\">\\"read-fs\\"</span><span class=\\"token punctuation\\">]</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token function\\">node</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  policy <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"read\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">host_volume <span class=\\"token string\\">\\"*\\"</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  policy <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"write\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">plugin <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  policy <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"read\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">#위에서 만든 policy 파일을 nomad cluster에 적용</span></span>\\n<span class=\\"line\\">$ nomad acl policy apply <span class=\\"token parameter variable\\">-description</span> <span class=\\"token string\\">\\"Production UI policy\\"</span> prod-ui nomad-ui-policy.hcl</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">#해당 policy로 token생성(policy는 여러개를 넣을 수도 있음)</span></span>\\n<span class=\\"line\\">$ nomad acl token create <span class=\\"token parameter variable\\">-name</span><span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"prod ui token\\"</span> <span class=\\"token parameter variable\\">-policy</span><span class=\\"token operator\\">=</span>prod-ui <span class=\\"token parameter variable\\">-type</span><span class=\\"token operator\\">=</span>client <span class=\\"token operator\\">|</span> <span class=\\"token function\\">tee</span> ui-prod.token</span>\\n<span class=\\"line\\"><span class=\\"token comment\\">#웹 브라우저 로그인을 위해 Secret ID 복사</span></span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{k as comp,g as data};