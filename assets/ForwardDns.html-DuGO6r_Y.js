import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},p=e(`<h1 id="forwarddns" tabindex="-1"><a class="header-anchor" href="#forwarddns"><span>ForwardDns</span></a></h1><h2 id="consul-dns를-local에서도-사용해야-할-경우에는-dns-forward를-해줘야한다-아래는-ubuntu-환경에서-진행하였음" tabindex="-1"><a class="header-anchor" href="#consul-dns를-local에서도-사용해야-할-경우에는-dns-forward를-해줘야한다-아래는-ubuntu-환경에서-진행하였음"><span>Consul dns를 local에서도 사용해야 할 경우에는 dns forward를 해줘야한다. 아래는 ubuntu 환경에서 진행하였음</span></a></h2><h2 id="설정-명령어" tabindex="-1"><a class="header-anchor" href="#설정-명령어"><span>설정 명령어</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#systemd-resolved 설정파일 추가 및 변경</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/systemd/resolved.conf.d</span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">&lt;&lt;-</span><span class="token string">EOF</span>
<span class="line">[Resolve]</span>
<span class="line">DNS=127.0.0.1</span>
<span class="line">DNSSEC=false</span>
<span class="line">Domains=~consul</span>
<span class="line">EOF</span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/systemd/resolved.conf.d/consul.conf</span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">&lt;&lt;-</span><span class="token string">EOF</span>
<span class="line">nameserver 127.0.0.1</span>
<span class="line">options edns0 trust-ad</span>
<span class="line">EOF</span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/resolv.conf</span>
<span class="line"><span class="token comment">#iptables에 consul dns port 추가</span></span>
<span class="line">iptables <span class="token parameter variable">--table</span> nat <span class="token parameter variable">--append</span> OUTPUT <span class="token parameter variable">--destination</span> localhost <span class="token parameter variable">--protocol</span> udp <span class="token parameter variable">--match</span> udp <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">--jump</span> REDIRECT --to-ports <span class="token number">8600</span></span>
<span class="line">iptables <span class="token parameter variable">--table</span> nat <span class="token parameter variable">--append</span> OUTPUT <span class="token parameter variable">--destination</span> localhost <span class="token parameter variable">--protocol</span> tcp <span class="token parameter variable">--match</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">53</span> <span class="token parameter variable">--jump</span> REDIRECT --to-ports <span class="token number">8600</span></span>
<span class="line"><span class="token comment">#service 재시작</span></span>
<span class="line">systemctl restart systemd-resolved</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="확인-명령어" tabindex="-1"><a class="header-anchor" href="#확인-명령어"><span>확인 명령어</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#Global domain에 consul 확인 </span></span>
<span class="line">$ resolvectl domain</span>
<span class="line">Global: ~consul</span>
<span class="line">Link <span class="token number">5</span> <span class="token punctuation">(</span>docker0<span class="token punctuation">)</span>:</span>
<span class="line">Link <span class="token number">4</span> <span class="token punctuation">(</span>eth2<span class="token punctuation">)</span>:</span>
<span class="line">Link <span class="token number">3</span> <span class="token punctuation">(</span>eth1<span class="token punctuation">)</span>:</span>
<span class="line">Link <span class="token number">2</span> <span class="token punctuation">(</span>eth0<span class="token punctuation">)</span>:</span>
<span class="line"><span class="token comment">#consul service확인, 해당 클러스터에는 consul server가 3대임</span></span>
<span class="line">$ resolvectl query consul.service.consul</span>
<span class="line">consul.service.consul: <span class="token number">172.30</span>.1.100</span>
<span class="line">                       <span class="token number">172.30</span>.1.101</span>
<span class="line">                       <span class="token number">172.30</span>.1.102</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),t=[p];function o(c,i){return n(),a("div",null,t)}const u=s(l,[["render",o],["__file","ForwardDns.html.vue"]]),m=JSON.parse('{"path":"/04-HashiCorp/04-Consul/02-Configuration/ForwardDns.html","title":"ForwardDns","lang":"ko-KR","frontmatter":{"description":"Consul ForwardDNS","tag":["Consul","Enterprise","Configuration","ForwardDns"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/04-Consul/02-Configuration/ForwardDns.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"ForwardDns"}],["meta",{"property":"og:description","content":"Consul ForwardDNS"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"Enterprise"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:tag","content":"ForwardDns"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ForwardDns\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Consul dns를 local에서도 사용해야 할 경우에는 dns forward를 해줘야한다. 아래는 ubuntu 환경에서 진행하였음","slug":"consul-dns를-local에서도-사용해야-할-경우에는-dns-forward를-해줘야한다-아래는-ubuntu-환경에서-진행하였음","link":"#consul-dns를-local에서도-사용해야-할-경우에는-dns-forward를-해줘야한다-아래는-ubuntu-환경에서-진행하였음","children":[]},{"level":2,"title":"설정 명령어","slug":"설정-명령어","link":"#설정-명령어","children":[]},{"level":2,"title":"확인 명령어","slug":"확인-명령어","link":"#확인-명령어","children":[]}],"git":{"createdTime":1642495573000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"ung","email":"swbs90@naver.com","commits":1}]},"readingTime":{"minutes":2.07,"words":124},"filePathRelative":"04-HashiCorp/04-Consul/02-Configuration/ForwardDns.md","localizedDate":"2022년 1월 18일","excerpt":"\\n<h2>Consul dns를 local에서도 사용해야 할 경우에는 dns forward를 해줘야한다. 아래는 ubuntu 환경에서 진행하였음</h2>\\n<h2>설정 명령어</h2>\\n<div class=\\"language-bash\\" data-highlighter=\\"prismjs\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"line\\"><span class=\\"token comment\\">#systemd-resolved 설정파일 추가 및 변경</span></span>\\n<span class=\\"line\\"><span class=\\"token function\\">mkdir</span> <span class=\\"token parameter variable\\">-p</span> /etc/systemd/resolved.conf.d</span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">(</span></span>\\n<span class=\\"line\\"><span class=\\"token function\\">cat</span> <span class=\\"token operator\\">&lt;&lt;-</span><span class=\\"token string\\">EOF</span>\\n<span class=\\"line\\">[Resolve]</span>\\n<span class=\\"line\\">DNS=127.0.0.1</span>\\n<span class=\\"line\\">DNSSEC=false</span>\\n<span class=\\"line\\">Domains=~consul</span>\\n<span class=\\"line\\">EOF</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">|</span> <span class=\\"token function\\">sudo</span> <span class=\\"token function\\">tee</span> /etc/systemd/resolved.conf.d/consul.conf</span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">(</span></span>\\n<span class=\\"line\\"><span class=\\"token function\\">cat</span> <span class=\\"token operator\\">&lt;&lt;-</span><span class=\\"token string\\">EOF</span>\\n<span class=\\"line\\">nameserver 127.0.0.1</span>\\n<span class=\\"line\\">options edns0 trust-ad</span>\\n<span class=\\"line\\">EOF</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">|</span> <span class=\\"token function\\">sudo</span> <span class=\\"token function\\">tee</span> /etc/resolv.conf</span>\\n<span class=\\"line\\"><span class=\\"token comment\\">#iptables에 consul dns port 추가</span></span>\\n<span class=\\"line\\">iptables <span class=\\"token parameter variable\\">--table</span> nat <span class=\\"token parameter variable\\">--append</span> OUTPUT <span class=\\"token parameter variable\\">--destination</span> localhost <span class=\\"token parameter variable\\">--protocol</span> udp <span class=\\"token parameter variable\\">--match</span> udp <span class=\\"token parameter variable\\">--dport</span> <span class=\\"token number\\">53</span> <span class=\\"token parameter variable\\">--jump</span> REDIRECT --to-ports <span class=\\"token number\\">8600</span></span>\\n<span class=\\"line\\">iptables <span class=\\"token parameter variable\\">--table</span> nat <span class=\\"token parameter variable\\">--append</span> OUTPUT <span class=\\"token parameter variable\\">--destination</span> localhost <span class=\\"token parameter variable\\">--protocol</span> tcp <span class=\\"token parameter variable\\">--match</span> tcp <span class=\\"token parameter variable\\">--dport</span> <span class=\\"token number\\">53</span> <span class=\\"token parameter variable\\">--jump</span> REDIRECT --to-ports <span class=\\"token number\\">8600</span></span>\\n<span class=\\"line\\"><span class=\\"token comment\\">#service 재시작</span></span>\\n<span class=\\"line\\">systemctl restart systemd-resolved</span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{u as comp,m as data};