import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as p}from"./app-DhMJQ1_3.js";const e={},t=p(`<h1 id="nomad-공통-설정" tabindex="-1"><a class="header-anchor" href="#nomad-공통-설정"><span>Nomad 공통 설정</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 server, client의 공통설정 파일입니다.<br> 저는 agent.hcl파일안에 다 넣고 실행하지만 나눠서 추후에는 기능별로 나눠서 사용할 예정입니다.</p></div><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#nomad 공통 설정</span></span>
<span class="line"><span class="token property">datacenter</span> <span class="token punctuation">=</span> <span class="token string">&quot;dc1&quot;</span></span>
<span class="line"><span class="token property">region</span> <span class="token punctuation">=</span> <span class="token string">&quot;global&quot;</span></span>
<span class="line"><span class="token property">data_dir</span> <span class="token punctuation">=</span> <span class="token string">&quot;/opt/nomad/nomad&quot;</span></span>
<span class="line"><span class="token property">bind_addr</span> <span class="token punctuation">=</span> <span class="token string">&quot;{{ GetInterfaceIP \`ens192\` }}&quot;</span></span>
<span class="line"> </span>
<span class="line"><span class="token keyword">advertise</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># Defaults to the first private IP address.</span></span>
<span class="line">  <span class="token comment">#http = &quot;{{ GetInterfaceIP \`ens244\` }}&quot;</span></span>
<span class="line">  <span class="token comment">#rpc  = &quot;{{ GetInterfaceIP \`ens244\` }}&quot;</span></span>
<span class="line">  <span class="token comment">#serf = &quot;{{ GetInterfaceIP \`ens244\` }}&quot;</span></span>
<span class="line">  <span class="token property">http</span> <span class="token punctuation">=</span> <span class="token string">&quot;{{ GetInterfaceIP \`ens192\` }}&quot;</span></span>
<span class="line">  <span class="token property">rpc</span> <span class="token punctuation">=</span> <span class="token string">&quot;{{ GetInterfaceIP \`ens192\` }}&quot;</span></span>
<span class="line">  <span class="token property">serf</span> <span class="token punctuation">=</span> <span class="token string">&quot;{{ GetInterfaceIP \`ens192\` }}&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"><span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">address</span>  <span class="token punctuation">=</span> <span class="token string">&quot;127.0.0.1:8500&quot;</span></span>
<span class="line">  <span class="token property">server_service_name</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad&quot;</span></span>
<span class="line">  <span class="token property">client_service_name</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad-client&quot;</span></span>
<span class="line">  <span class="token property">auto_advertise</span>  <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">server_auto_join</span>  <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">client_auto_join</span>  <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token comment">#consul join용 token</span></span>
<span class="line">  <span class="token property">token</span> <span class="token punctuation">=</span> <span class="token string">&quot;33ee4276-e1ef-8e5b-d212-1f94ca8cf81e&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token property">enable_syslog</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token property">enable_debug</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token property">disable_update_check</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line"> </span>
<span class="line"><span class="token property">log_level</span> <span class="token punctuation">=</span> <span class="token string">&quot;DEBUG&quot;</span></span>
<span class="line"><span class="token property">log_file</span> <span class="token punctuation">=</span> <span class="token string">&quot;/var/log/nomad/nomad.log&quot;</span></span>
<span class="line"><span class="token property">log_rotate_duration</span> <span class="token punctuation">=</span> <span class="token string">&quot;24h&quot;</span></span>
<span class="line"><span class="token property">log_rotate_bytes</span> <span class="token punctuation">=</span> <span class="token number">104857600</span></span>
<span class="line"><span class="token property">log_rotate_max_files</span> <span class="token punctuation">=</span> <span class="token number">100</span></span>
<span class="line"> </span>
<span class="line"><span class="token keyword">ports</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">http</span> <span class="token punctuation">=</span> <span class="token number">4646</span></span>
<span class="line">  <span class="token property">rpc</span> <span class="token punctuation">=</span> <span class="token number">4647</span></span>
<span class="line">  <span class="token property">serf</span> <span class="token punctuation">=</span> <span class="token number">4648</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"><span class="token comment">#prometheus에서 nomad의 metrics값을 수집 해 갈 수 있게 해주는 설정</span></span>
<span class="line"><span class="token keyword">telemetry</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">collection_interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;1s&quot;</span></span>
<span class="line">  <span class="token property">disable_hostname</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">prometheus_metrics</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">publish_allocation_metrics</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">publish_node_metrics</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"> </span>
<span class="line">plugin <span class="token string">&quot;docker&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">auth</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">config</span> <span class="token punctuation">=</span> <span class="token string">&quot;/root/.docker/config.json&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">#온프레이머스환경에서는 해당 이미지를 private repository에 ㅓㄶ고 변경</span></span>
<span class="line">    <span class="token property">infra_image</span> <span class="token punctuation">=</span> <span class="token string">&quot;google-containers/pause-amd64:3.1&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"><span class="token keyword">acl</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[t];function o(c,i){return s(),a("div",null,l)}const k=n(e,[["render",o],["__file","common.html.vue"]]),d=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/02-Config/common.html","title":"Nomad 공통 설정","lang":"ko-KR","frontmatter":{"description":"Nomad Common Configuration","tag":["Nomad","Enterprise","Configuration","Common"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/02-Config/common.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Nomad 공통 설정"}],["meta",{"property":"og:description","content":"Nomad Common Configuration"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Enterprise"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:tag","content":"Common"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nomad 공통 설정\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1629555140000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":2},{"name":"swbs90","email":"swbs90@naver.com","commits":2}]},"readingTime":{"minutes":2.17,"words":130},"filePathRelative":"04-HashiCorp/07-Nomad/02-Config/common.md","localizedDate":"2021년 8월 21일","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 server, client의 공통설정 파일입니다.<br>\\n저는 agent.hcl파일안에 다 넣고 실행하지만 나눠서 추후에는 기능별로 나눠서 사용할 예정입니다.</p>\\n</div>\\n<div class=\\"language-hcl\\" data-highlighter=\\"prismjs\\" data-ext=\\"hcl\\" data-title=\\"hcl\\"><pre class=\\"language-hcl\\"><code><span class=\\"line\\"><span class=\\"token comment\\">#nomad 공통 설정</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">datacenter</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"dc1\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">region</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"global\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">data_dir</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"/opt/nomad/nomad\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">bind_addr</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"{{ GetInterfaceIP `ens192` }}\\"</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">advertise</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\"># Defaults to the first private IP address.</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">#http = \\"{{ GetInterfaceIP `ens244` }}\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">#rpc  = \\"{{ GetInterfaceIP `ens244` }}\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">#serf = \\"{{ GetInterfaceIP `ens244` }}\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">http</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"{{ GetInterfaceIP `ens192` }}\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">rpc</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"{{ GetInterfaceIP `ens192` }}\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">serf</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"{{ GetInterfaceIP `ens192` }}\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">consul</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">address</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"127.0.0.1:8500\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">server_service_name</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"nomad\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">client_service_name</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"nomad-client\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">auto_advertise</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">server_auto_join</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">client_auto_join</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">#consul join용 token</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">token</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"33ee4276-e1ef-8e5b-d212-1f94ca8cf81e\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">enable_syslog</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">false</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">enable_debug</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">false</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">disable_update_check</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">false</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"><span class=\\"token property\\">log_level</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"DEBUG\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">log_file</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"/var/log/nomad/nomad.log\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">log_rotate_duration</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"24h\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">log_rotate_bytes</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token number\\">104857600</span></span>\\n<span class=\\"line\\"><span class=\\"token property\\">log_rotate_max_files</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token number\\">100</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">ports</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">http</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token number\\">4646</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">rpc</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token number\\">4647</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">serf</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token number\\">4648</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"><span class=\\"token comment\\">#prometheus에서 nomad의 metrics값을 수집 해 갈 수 있게 해주는 설정</span></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">telemetry</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">collection_interval</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"1s\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">disable_hostname</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">prometheus_metrics</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">publish_allocation_metrics</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">publish_node_metrics</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">plugin <span class=\\"token string\\">\\"docker\\"</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token keyword\\">config</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">    <span class=\\"token keyword\\">auth</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">config</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"/root/.docker/config.json\\"</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">    <span class=\\"token comment\\">#온프레이머스환경에서는 해당 이미지를 private repository에 ㅓㄶ고 변경</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">infra_image</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"google-containers/pause-amd64:3.1\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">acl</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">enabled</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{k as comp,d as data};