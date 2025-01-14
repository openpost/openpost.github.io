import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as l}from"./app-DhMJQ1_3.js";const e={},i=l(`<h1 id="consul-공통-설정" tabindex="-1"><a class="header-anchor" href="#consul-공통-설정"><span>Consul 공통 설정</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 server, client의 공통설정 파일입니다.<br> 저는 agent.hcl파일안에 다 넣고 실행하지만 나눠서 추후에는 기능별로 나눠서 사용할 예정입니다.</p></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">#node name에는 _금지</span>
<span class="line">#node_name</span>
<span class="line"> </span>
<span class="line">client_addr = &quot;0.0.0.0&quot;</span>
<span class="line">bind_addr = &quot;{{ GetInterfaceIP \`ens192\` }}&quot;</span>
<span class="line">advertise_addr = &quot;{{ GetInterfaceIP \`ens224\` }}&quot;</span>
<span class="line"> </span>
<span class="line">#ipv4, ipv6를 나눠서 설정할 수 있음.</span>
<span class="line">#advertise_addr_ipv4</span>
<span class="line">#advertise_addr_ipv6</span>
<span class="line"> </span>
<span class="line">ports {</span>
<span class="line">  #http = 8500</span>
<span class="line">  http = -1</span>
<span class="line">  dns = 8600</span>
<span class="line">  #https = -1</span>
<span class="line">  https = 8500</span>
<span class="line">  serf_lan = 8301</span>
<span class="line">  grpc = 8502</span>
<span class="line">  server = 8300</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">#gossip ip 지정</span>
<span class="line">#serf_lan</span>
<span class="line">#gossip 대역대 지정</span>
<span class="line">#serf_lan_allowed_cidrs</span>
<span class="line"> </span>
<span class="line">#사용자 감사, 사용자가 consul에서 사용한 행동을 기록</span>
<span class="line">#audit {</span>
<span class="line">#  enabled = true</span>
<span class="line">#  sink &quot;My sink&quot; {</span>
<span class="line">#    type   = &quot;file&quot;</span>
<span class="line">#    format = &quot;json&quot;</span>
<span class="line">#    path   = &quot;data/audit/audit.json&quot;</span>
<span class="line">#    #consul의 감사작성방법 규칙, 현재는 best-effort만지원</span>
<span class="line">#    delivery_guarantee = &quot;best-effort&quot;</span>
<span class="line">#    rotate_duration = &quot;24h&quot;</span>
<span class="line">#    rotate_max_files = 15</span>
<span class="line">#    rotate_bytes = 25165824</span>
<span class="line">#  }</span>
<span class="line">#}</span>
<span class="line"> </span>
<span class="line">#consul 서버관리 설정 변경</span>
<span class="line">#autopoilt {</span>
<span class="line">#    #새로운 서버가 클러스터에 추가될 때 죽은 서버 자동제거</span>
<span class="line">#    cleanup_dead_servers = ture</span>
<span class="line">#</span>
<span class="line">#    last_contact_threshold = 200ms</span>
<span class="line">#    #최소 quorm 수 지정</span>
<span class="line">#    min_quorum = ni</span>
<span class="line">#    #클러스터에 서버가 추가될 시 안정상태로 되어야 하는 최소 시간</span>
<span class="line">#    server_stabilization_time = 10s</span>
<span class="line">#}</span>
<span class="line"> </span>
<span class="line">#동시에 처리할 수 있는 인증서 서명 요청 제한</span>
<span class="line">#csr_max_concurrent = 0</span>
<span class="line">#서버가 수락할 인증서 서명 요청(CSR)의 최대 수에 대한 속도 제한을 설정</span>
<span class="line">#csr_max_per_second = 50</span>
<span class="line">#클러스터에서 이전 루트 인증서를 교체할 때 사용</span>
<span class="line">#leaf_cert_ttl = 72h</span>
<span class="line">#CA 키 생성 타입</span>
<span class="line">#private_key_type = ec</span>
<span class="line">#CA 키 생성될 길이</span>
<span class="line">#private_key_bits = 256</span>
<span class="line"> </span>
<span class="line">#서버에서만 client를 join할 수 있게 함</span>
<span class="line">#disable remote exec</span>
<span class="line"> </span>
<span class="line">#enable syslog = true</span>
<span class="line">log_level = &quot;DEBUG&quot;</span>
<span class="line">data_dir = &quot;/var/log/consul/consul&quot;</span>
<span class="line">log_file = &quot;/var/log/consul/consul.log&quot;</span>
<span class="line">log_rotate_duration = &quot;24h&quot;</span>
<span class="line">log_rotate_bytes = 104857600</span>
<span class="line">log_rotate_max_files = 100</span>
<span class="line"> </span>
<span class="line">license_path = &quot;/opt/license/consul.license&quot;</span>
<span class="line"> </span>
<span class="line">acl {</span>
<span class="line">  enabled = true</span>
<span class="line">  default_policy = &quot;allow&quot;</span>
<span class="line">  enable_token_persistence = true</span>
<span class="line"> </span>
<span class="line">  #acl policy ttl, 줄이면 새로고침 빈도 상승, 성능에 영향을 미칠 수 있음</span>
<span class="line">  #policy_ttl = 30s</span>
<span class="line">  #acl role ttl, 줄이면 새로고침 빈도 상승, 성능에 영향을 미칠 수 있음</span>
<span class="line">  #role_ttl = 30s</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">connect {</span>
<span class="line">  enabled = true</span>
<span class="line">  #vault 연동 옵션</span>
<span class="line">  #ca_provider</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">dns_config {</span>
<span class="line">  allow_stale = true,</span>
<span class="line">  max_stale = &quot;87600h&quot;</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">#block_endpoints할성화시 restapi 차단</span>
<span class="line">#http_config {</span>
<span class="line">#    block_endpoints = false</span>
<span class="line">#}</span>
<span class="line"> </span>
<span class="line">#segments</span>
<span class="line"> </span>
<span class="line">rpc {</span>
<span class="line">  enable_streaming = true</span>
<span class="line">}</span>
<span class="line"> </span>
<span class="line">encrypt = &quot;7VY2fVm0p6vJUYNS/oex/mr2e59dy4AaGMefTKtUGi0=&quot;</span>
<span class="line">encrypt_verify_incoming = false</span>
<span class="line">encrypt_verify_outgoing = false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),p=[i];function c(t,d){return s(),a("div",null,p)}const v=n(e,[["render",c],["__file","common.html.vue"]]),u=JSON.parse('{"path":"/04-HashiCorp/04-Consul/02-Configuration/common.html","title":"Consul 공통 설정","lang":"ko-KR","frontmatter":{"description":"Consul Common Configuration","tag":["Consul","Enterprise","Configuration","Common"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/04-Consul/02-Configuration/common.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Consul 공통 설정"}],["meta",{"property":"og:description","content":"Consul Common Configuration"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"Enterprise"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:tag","content":"Common"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Consul 공통 설정\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1629519254000,"updatedTime":1695042774000,"contributors":[{"name":"swbs90","email":"swbs90@naver.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":2.8,"words":168},"filePathRelative":"04-HashiCorp/04-Consul/02-Configuration/common.md","localizedDate":"2021년 8월 21일","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<p>최대한 설정값을 넣어보고, 번역기도 돌려보고 물어도 보고 넣은 server, client의 공통설정 파일입니다.<br>\\n저는 agent.hcl파일안에 다 넣고 실행하지만 나눠서 추후에는 기능별로 나눠서 사용할 예정입니다.</p>\\n</div>\\n<div class=\\"language-text\\" data-highlighter=\\"prismjs\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code><span class=\\"line\\">#node name에는 _금지</span>\\n<span class=\\"line\\">#node_name</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">client_addr = \\"0.0.0.0\\"</span>\\n<span class=\\"line\\">bind_addr = \\"{{ GetInterfaceIP `ens192` }}\\"</span>\\n<span class=\\"line\\">advertise_addr = \\"{{ GetInterfaceIP `ens224` }}\\"</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#ipv4, ipv6를 나눠서 설정할 수 있음.</span>\\n<span class=\\"line\\">#advertise_addr_ipv4</span>\\n<span class=\\"line\\">#advertise_addr_ipv6</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">ports {</span>\\n<span class=\\"line\\">  #http = 8500</span>\\n<span class=\\"line\\">  http = -1</span>\\n<span class=\\"line\\">  dns = 8600</span>\\n<span class=\\"line\\">  #https = -1</span>\\n<span class=\\"line\\">  https = 8500</span>\\n<span class=\\"line\\">  serf_lan = 8301</span>\\n<span class=\\"line\\">  grpc = 8502</span>\\n<span class=\\"line\\">  server = 8300</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#gossip ip 지정</span>\\n<span class=\\"line\\">#serf_lan</span>\\n<span class=\\"line\\">#gossip 대역대 지정</span>\\n<span class=\\"line\\">#serf_lan_allowed_cidrs</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#사용자 감사, 사용자가 consul에서 사용한 행동을 기록</span>\\n<span class=\\"line\\">#audit {</span>\\n<span class=\\"line\\">#  enabled = true</span>\\n<span class=\\"line\\">#  sink \\"My sink\\" {</span>\\n<span class=\\"line\\">#    type   = \\"file\\"</span>\\n<span class=\\"line\\">#    format = \\"json\\"</span>\\n<span class=\\"line\\">#    path   = \\"data/audit/audit.json\\"</span>\\n<span class=\\"line\\">#    #consul의 감사작성방법 규칙, 현재는 best-effort만지원</span>\\n<span class=\\"line\\">#    delivery_guarantee = \\"best-effort\\"</span>\\n<span class=\\"line\\">#    rotate_duration = \\"24h\\"</span>\\n<span class=\\"line\\">#    rotate_max_files = 15</span>\\n<span class=\\"line\\">#    rotate_bytes = 25165824</span>\\n<span class=\\"line\\">#  }</span>\\n<span class=\\"line\\">#}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#consul 서버관리 설정 변경</span>\\n<span class=\\"line\\">#autopoilt {</span>\\n<span class=\\"line\\">#    #새로운 서버가 클러스터에 추가될 때 죽은 서버 자동제거</span>\\n<span class=\\"line\\">#    cleanup_dead_servers = ture</span>\\n<span class=\\"line\\">#</span>\\n<span class=\\"line\\">#    last_contact_threshold = 200ms</span>\\n<span class=\\"line\\">#    #최소 quorm 수 지정</span>\\n<span class=\\"line\\">#    min_quorum = ni</span>\\n<span class=\\"line\\">#    #클러스터에 서버가 추가될 시 안정상태로 되어야 하는 최소 시간</span>\\n<span class=\\"line\\">#    server_stabilization_time = 10s</span>\\n<span class=\\"line\\">#}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#동시에 처리할 수 있는 인증서 서명 요청 제한</span>\\n<span class=\\"line\\">#csr_max_concurrent = 0</span>\\n<span class=\\"line\\">#서버가 수락할 인증서 서명 요청(CSR)의 최대 수에 대한 속도 제한을 설정</span>\\n<span class=\\"line\\">#csr_max_per_second = 50</span>\\n<span class=\\"line\\">#클러스터에서 이전 루트 인증서를 교체할 때 사용</span>\\n<span class=\\"line\\">#leaf_cert_ttl = 72h</span>\\n<span class=\\"line\\">#CA 키 생성 타입</span>\\n<span class=\\"line\\">#private_key_type = ec</span>\\n<span class=\\"line\\">#CA 키 생성될 길이</span>\\n<span class=\\"line\\">#private_key_bits = 256</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#서버에서만 client를 join할 수 있게 함</span>\\n<span class=\\"line\\">#disable remote exec</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#enable syslog = true</span>\\n<span class=\\"line\\">log_level = \\"DEBUG\\"</span>\\n<span class=\\"line\\">data_dir = \\"/var/log/consul/consul\\"</span>\\n<span class=\\"line\\">log_file = \\"/var/log/consul/consul.log\\"</span>\\n<span class=\\"line\\">log_rotate_duration = \\"24h\\"</span>\\n<span class=\\"line\\">log_rotate_bytes = 104857600</span>\\n<span class=\\"line\\">log_rotate_max_files = 100</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">license_path = \\"/opt/license/consul.license\\"</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">acl {</span>\\n<span class=\\"line\\">  enabled = true</span>\\n<span class=\\"line\\">  default_policy = \\"allow\\"</span>\\n<span class=\\"line\\">  enable_token_persistence = true</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">  #acl policy ttl, 줄이면 새로고침 빈도 상승, 성능에 영향을 미칠 수 있음</span>\\n<span class=\\"line\\">  #policy_ttl = 30s</span>\\n<span class=\\"line\\">  #acl role ttl, 줄이면 새로고침 빈도 상승, 성능에 영향을 미칠 수 있음</span>\\n<span class=\\"line\\">  #role_ttl = 30s</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">connect {</span>\\n<span class=\\"line\\">  enabled = true</span>\\n<span class=\\"line\\">  #vault 연동 옵션</span>\\n<span class=\\"line\\">  #ca_provider</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">dns_config {</span>\\n<span class=\\"line\\">  allow_stale = true,</span>\\n<span class=\\"line\\">  max_stale = \\"87600h\\"</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#block_endpoints할성화시 restapi 차단</span>\\n<span class=\\"line\\">#http_config {</span>\\n<span class=\\"line\\">#    block_endpoints = false</span>\\n<span class=\\"line\\">#}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">#segments</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">rpc {</span>\\n<span class=\\"line\\">  enable_streaming = true</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"> </span>\\n<span class=\\"line\\">encrypt = \\"7VY2fVm0p6vJUYNS/oex/mr2e59dy4AaGMefTKtUGi0=\\"</span>\\n<span class=\\"line\\">encrypt_verify_incoming = false</span>\\n<span class=\\"line\\">encrypt_verify_outgoing = false</span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{v as comp,u as data};
