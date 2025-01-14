import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},i=e(`<h1 id="consul-서버-설정" tabindex="-1"><a class="header-anchor" href="#consul-서버-설정"><span>Consul 서버 설정</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 server설정 파일입니다.<br> 네트워크는 프라이빗(온프레이머스) 환경입니다.</p></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#consul server 설정</span>
<span class="line">server = true</span>
<span class="line">ui_config {</span>
<span class="line">  enabled = true</span>
<span class="line">}</span>
<span class="line">bootstrap_expect = 3</span>
<span class="line">  </span>
<span class="line">license_path = &quot;/opt/license/consul.license&quot;</span>
<span class="line"> </span>
<span class="line">retry_join = [&quot;172.30.1.17&quot;,&quot;172.30.1.18&quot;,&quot;172.30.1.19&quot;]</span>
<span class="line"> </span>
<span class="line">performance {</span>
<span class="line">  raft_multiplier = 1</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">#raft protocal 버전, consul 업데이트 시 1씩 증가</span>
<span class="line">raft_protocol = 3</span>
<span class="line"> </span>
<span class="line">#node가 완전히 삭제되는 시간</span>
<span class="line">reconnect_timeout = &quot;72h&quot;</span>
<span class="line"> </span>
<span class="line">raft_snapshot_interval = &quot;5s&quot;</span>
<span class="line"> </span>
<span class="line">#해당 서버를 non-voting server로 지정</span>
<span class="line">#read_replica = false</span>
<span class="line"> </span>
<span class="line">limits {</span>
<span class="line">  http_max_conns_per_client = 200</span>
<span class="line">  rpc_handshake_timeout = &quot;5s&quot;</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">key_file = &quot;/opt/ssl/consul/dc1-server-consul-0-key.pem&quot;</span>
<span class="line">cert_file = &quot;/opt/ssl/consul/dc1-server-consul-0.pem&quot;</span>
<span class="line">ca_file = &quot;/opt/ssl/consul/consul-agent-ca.pem&quot;</span>
<span class="line">auto_encrypt {</span>
<span class="line">  allow_tls = true</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">verify_incoming = false,</span>
<span class="line">verify_incoming_rpc = true</span>
<span class="line">verify_outgoing = true</span>
<span class="line">verify_server_hostname = false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="consul-서버-최소-설정-20220807기준" tabindex="-1"><a class="header-anchor" href="#consul-서버-최소-설정-20220807기준"><span>Consul 서버 최소 설정 (20220807기준)</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>최소한의 설정만 있는 consul 설정입니다.</p></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">data_dir <span class="token operator">=</span> <span class="token string">&quot;/opt/consul&quot;</span></span>
<span class="line"></span>
<span class="line">client_addr <span class="token operator">=</span> <span class="token string">&quot;0.0.0.0&quot;</span></span>
<span class="line"></span>
<span class="line">datacenter <span class="token operator">=</span> <span class="token string">&quot;my-dc&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#ui</span></span>
<span class="line">ui_config <span class="token punctuation">{</span></span>
<span class="line">  enabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># server</span></span>
<span class="line">server <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Bind addr</span></span>
<span class="line">bind_addr <span class="token operator">=</span> <span class="token string">&quot;0.0.0.0&quot;</span> <span class="token comment"># Listen on all IPv4</span></span>
<span class="line"><span class="token comment"># Advertise addr - if you want to point clients to a different address than bind or LB.</span></span>
<span class="line">advertise_addr <span class="token operator">=</span> <span class="token string">&quot;node ip&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Enterprise License</span></span>
<span class="line">license_path <span class="token operator">=</span> <span class="token string">&quot;/opt/consul/consul.lic&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># bootstrap_expect</span></span>
<span class="line"><span class="token assign-left variable">bootstrap_expect</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># encrypt</span></span>
<span class="line">encrypt <span class="token operator">=</span> <span class="token string">&quot;7w+zkhqa+YD4GSKXjRWETBIT8hs53Sr/w95oiVxq5Qc=&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># retry_join</span></span>
<span class="line">retry_join <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;Server ip&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">key_file <span class="token operator">=</span> <span class="token string">&quot;/opt/consul/my-dc-server-consul-0-key.pem&quot;</span></span>
<span class="line">cert_file <span class="token operator">=</span> <span class="token string">&quot;/opt/consul/my-dc-server-consul-0.pem&quot;</span></span>
<span class="line">ca_file <span class="token operator">=</span> <span class="token string">&quot;/opt/consul/consul-agent-ca.pem&quot;</span></span>
<span class="line">auto_encrypt <span class="token punctuation">{</span></span>
<span class="line">  allow_tls <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">verify_incoming <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">verify_incoming_rpc <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">verify_outgoing <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">verify_server_hostname <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">ports <span class="token punctuation">{</span></span>
<span class="line">  http <span class="token operator">=</span> <span class="token number">8500</span></span>
<span class="line">  dns <span class="token operator">=</span> <span class="token number">8600</span></span>
<span class="line">  server <span class="token operator">=</span> <span class="token number">8300</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),p=[i];function c(t,o){return n(),a("div",null,p)}const u=s(l,[["render",c],["__file","server.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/04-Consul/02-Configuration/server.html","title":"Consul 서버 설정","lang":"ko-KR","frontmatter":{"description":"Consul Server Configuration","tag":["Consul","Enterprise","Configuration","Server"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/04-Consul/02-Configuration/server.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Consul 서버 설정"}],["meta",{"property":"og:description","content":"Consul Server Configuration"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"Enterprise"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:tag","content":"Server"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Consul 서버 설정\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1629519523000,"updatedTime":1695042774000,"contributors":[{"name":"admin","email":"sulee@expernet.co.kr","commits":2},{"name":"swbs90","email":"swbs90@naver.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":2.95,"words":177},"filePathRelative":"04-HashiCorp/04-Consul/02-Configuration/server.md","localizedDate":"2021년 8월 21일","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 server설정 파일입니다.<br>\\n네트워크는 프라이빗(온프레이머스) 환경입니다.</p>\\n</div>\\n<div class=\\"language-text\\" data-highlighter=\\"prismjs\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code><span class=\\"line\\">#consul server 설정</span>\\n<span class=\\"line\\">server = true</span>\\n<span class=\\"line\\">ui_config {</span>\\n<span class=\\"line\\">  enabled = true</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\">bootstrap_expect = 3</span>\\n<span class=\\"line\\">  </span>\\n<span class=\\"line\\">license_path = \\"/opt/license/consul.license\\"</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">retry_join = [\\"172.30.1.17\\",\\"172.30.1.18\\",\\"172.30.1.19\\"]</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">performance {</span>\\n<span class=\\"line\\">  raft_multiplier = 1</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#raft protocal 버전, consul 업데이트 시 1씩 증가</span>\\n<span class=\\"line\\">raft_protocol = 3</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#node가 완전히 삭제되는 시간</span>\\n<span class=\\"line\\">reconnect_timeout = \\"72h\\"</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">raft_snapshot_interval = \\"5s\\"</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#해당 서버를 non-voting server로 지정</span>\\n<span class=\\"line\\">#read_replica = false</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">limits {</span>\\n<span class=\\"line\\">  http_max_conns_per_client = 200</span>\\n<span class=\\"line\\">  rpc_handshake_timeout = \\"5s\\"</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">key_file = \\"/opt/ssl/consul/dc1-server-consul-0-key.pem\\"</span>\\n<span class=\\"line\\">cert_file = \\"/opt/ssl/consul/dc1-server-consul-0.pem\\"</span>\\n<span class=\\"line\\">ca_file = \\"/opt/ssl/consul/consul-agent-ca.pem\\"</span>\\n<span class=\\"line\\">auto_encrypt {</span>\\n<span class=\\"line\\">  allow_tls = true</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">verify_incoming = false,</span>\\n<span class=\\"line\\">verify_incoming_rpc = true</span>\\n<span class=\\"line\\">verify_outgoing = true</span>\\n<span class=\\"line\\">verify_server_hostname = false</span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{u as comp,v as data};
