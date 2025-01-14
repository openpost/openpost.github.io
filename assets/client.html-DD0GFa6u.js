import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as e,h as a}from"./app-DhMJQ1_3.js";const i={},l=a(`<h1 id="consul-클라이언트-설정" tabindex="-1"><a class="header-anchor" href="#consul-클라이언트-설정"><span>Consul 클라이언트 설정</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 Client설정 파일입니다.<br> 네트워크는 프라이빗(온프레이머스) 환경입니다.</p></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#consul client 설정</span>
<span class="line">server = false</span>
<span class="line"></span>
<span class="line">acl = {</span>
<span class="line">  enabled = true</span>
<span class="line">  default_policy = &quot;deny&quot;</span>
<span class="line">  enable_token_persistence = true</span>
<span class="line">  tokens = {</span>
<span class="line">    agent = &quot;f820514a-5215-e741-fcb3-c00857405230&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">license_path = &quot;/opt/license/consul.license&quot;</span>
<span class="line"></span>
<span class="line">retry_join = [&quot;172.30.1.17&quot;,&quot;172.30.1.18&quot;,&quot;172.30.1.19&quot;]</span>
<span class="line"></span>
<span class="line">rejoin_after_leave = true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">#tls 설정</span>
<span class="line">ca_file = &quot;/opt/ssl/consul/consul-agent-ca.pem&quot;</span>
<span class="line">auto_encrypt = {</span>
<span class="line">  tls = true</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">verify_incoming = false</span>
<span class="line">verify_outgoing = true</span>
<span class="line">verify_server_hostname = true</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="consul-클라이언트-최소-설정-20220807기준" tabindex="-1"><a class="header-anchor" href="#consul-클라이언트-최소-설정-20220807기준"><span>Consul 클라이언트 최소 설정 (20220807기준)</span></a></h1><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">data_dir = &quot;/opt/consul&quot;</span>
<span class="line"></span>
<span class="line">client_addr = &quot;0.0.0.0&quot;</span>
<span class="line"></span>
<span class="line">datacenter = &quot;my-dc&quot;</span>
<span class="line"></span>
<span class="line"># client</span>
<span class="line">server = false</span>
<span class="line"></span>
<span class="line"># Bind addr</span>
<span class="line">bind_addr = &quot;0.0.0.0&quot; # Listen on all IPv4</span>
<span class="line"># Advertise addr - if you want to point clients to a different address than bind or LB.</span>
<span class="line">advertise_addr = &quot;node ip&quot;</span>
<span class="line"></span>
<span class="line"># Enterprise License</span>
<span class="line">license_path = &quot;/opt/consul/consul.lic&quot;</span>
<span class="line"></span>
<span class="line"># encrypt</span>
<span class="line">encrypt = &quot;7w+zkhqa+YD4GSKXjRWETBIT8hs53Sr/w95oiVxq5Qc=&quot;</span>
<span class="line"></span>
<span class="line"># retry_join</span>
<span class="line">retry_join = [&quot;server ip&quot;]</span>
<span class="line"></span>
<span class="line">ca_file = &quot;/opt/consul/consul-agent-ca.pem&quot;</span>
<span class="line">cert_file = &quot;/opt/consul/my-dc-client-consul-0.pem&quot;</span>
<span class="line">key_file = &quot;/opt/consul/my-dc-client-consul-0-key.pem&quot;</span>
<span class="line"></span>
<span class="line">verify_incoming = false</span>
<span class="line">verify_incoming_rpc = false</span>
<span class="line">verify_outgoing = false</span>
<span class="line">verify_server_hostname = false</span>
<span class="line"></span>
<span class="line">ports {</span>
<span class="line">  http = 8500</span>
<span class="line">  dns = 8600</span>
<span class="line">  server = 8300</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[l];function c(p,r){return s(),e("div",null,t)}const u=n(i,[["render",c],["__file","client.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/04-Consul/02-Configuration/client.html","title":"Consul 클라이언트 설정","lang":"ko-KR","frontmatter":{"description":"Consul Client Configuration","tag":["Consul","Enterprise","Configuration","Client"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/04-Consul/02-Configuration/client.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Consul 클라이언트 설정"}],["meta",{"property":"og:description","content":"Consul Client Configuration"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"Enterprise"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:tag","content":"Client"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Consul 클라이언트 설정\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1629519876000,"updatedTime":1695042774000,"contributors":[{"name":"admin","email":"sulee@expernet.co.kr","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"swbs90","email":"swbs9000@gmail.com","commits":1},{"name":"swbs90","email":"swbs90@naver.com","commits":1}]},"readingTime":{"minutes":2.3,"words":138},"filePathRelative":"04-HashiCorp/04-Consul/02-Configuration/client.md","localizedDate":"2021년 8월 21일","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 Client설정 파일입니다.<br>\\n네트워크는 프라이빗(온프레이머스) 환경입니다.</p>\\n</div>\\n<div class=\\"language-text\\" data-highlighter=\\"prismjs\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code><span class=\\"line\\">#consul client 설정</span>\\n<span class=\\"line\\">server = false</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">acl = {</span>\\n<span class=\\"line\\">  enabled = true</span>\\n<span class=\\"line\\">  default_policy = \\"deny\\"</span>\\n<span class=\\"line\\">  enable_token_persistence = true</span>\\n<span class=\\"line\\">  tokens = {</span>\\n<span class=\\"line\\">    agent = \\"f820514a-5215-e741-fcb3-c00857405230\\"</span>\\n<span class=\\"line\\">  }</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">license_path = \\"/opt/license/consul.license\\"</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">retry_join = [\\"172.30.1.17\\",\\"172.30.1.18\\",\\"172.30.1.19\\"]</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">rejoin_after_leave = true</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">#tls 설정</span>\\n<span class=\\"line\\">ca_file = \\"/opt/ssl/consul/consul-agent-ca.pem\\"</span>\\n<span class=\\"line\\">auto_encrypt = {</span>\\n<span class=\\"line\\">  tls = true</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">verify_incoming = false</span>\\n<span class=\\"line\\">verify_outgoing = true</span>\\n<span class=\\"line\\">verify_server_hostname = true</span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{u as comp,v as data};
