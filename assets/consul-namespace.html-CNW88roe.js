import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as p}from"./app-DhMJQ1_3.js";const e={},l=p(`<h1 id="consul-namespace-사용시-nomad의-서비스-등록" tabindex="-1"><a class="header-anchor" href="#consul-namespace-사용시-nomad의-서비스-등록"><span>Consul namespace 사용시 Nomad의 서비스 등록</span></a></h1><h2 id="job의-consul-namespace-정의" tabindex="-1"><a class="header-anchor" href="#job의-consul-namespace-정의"><span>Job의 Consul Namespace 정의</span></a></h2><p>Consul Enterprise는 <code>Namespace</code>가 있어서 Nomad로 Consul에 서비스 등록 시 특정 Namespace를 지정할 수 있음</p><p>Job &gt; Group &gt; Consul</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;frontback_job&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  group <span class="token string">&quot;backend_group_v1&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line highlighted">    <span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">      <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;mynamespace&quot;</span></span>
<span class="line highlighted">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">sidecar_service</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">        <span class="token property">path</span>     <span class="token punctuation">=</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">        <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;5s&quot;</span></span>
<span class="line">        <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;3s&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># 생략</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service-mesh-upstream" tabindex="-1"><a class="header-anchor" href="#service-mesh-upstream"><span>Service Mesh Upstream</span></a></h2><p>해당 <code>group</code>에 대한 글로벌 설정이기 때문에 Consul과 관련해서 구성되는 모든 설정은 해당 <code>Namespace</code>를 기준으로 적용됨<br> 예를 들어 <code>upstream</code> 구성을 하면</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;frontback_job&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  group <span class="token string">&quot;frontend_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line highlighted">    <span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">      <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;mesh&quot;</span></span>
<span class="line highlighted">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;frontend&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">sidecar_service</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">proxy</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">            <span class="token keyword">upstreams</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">              <span class="token property">destination_name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line highlighted">              <span class="token property">local_bind_port</span>  <span class="token punctuation">=</span> <span class="token number">10000</span></span>
<span class="line highlighted">            <span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># 생략</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sidecar의 로그에서도 적용된 namespace로 리스너가 등록되는 로그(<code>namesapce/servicename</code>) 확인 가능</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[2021-09-01 01:31:10.490][1][info][upstream] [source/common/upstream/cds_api_helper.cc:28] cds: add 3 cluster(s), remove 0 cluster(s)</span>
<span class="line">[2021-09-01 01:31:10.572][1][info][upstream] [source/common/upstream/cds_api_helper.cc:65] cds: added/updated 3 cluster(s), skipped 0 unmodified cluster(s)</span>
<span class="line">[2021-09-01 01:31:10.572][1][info][upstream] [source/common/upstream/cluster_manager_impl.cc:168] cm init: initializing secondary clusters</span>
<span class="line">[2021-09-01 01:31:10.574][1][info][upstream] [source/common/upstream/cluster_manager_impl.cc:192] cm init: all clusters initialized</span>
<span class="line">[2021-09-01 01:31:10.574][1][info][main] [source/server/server.cc:745] all clusters initialized. initializing init manager</span>
<span class="line highlighted">[2021-09-01 01:31:10.578][1][info][upstream] [source/server/lds_api.cc:78] lds: add/update listener &#39;mesh/backend:127.0.0.1:10000&#39;</span>
<span class="line">[2021-09-01 01:31:10.586][1][info][upstream] [source/server/lds_api.cc:78] lds: add/update listener &#39;public_listener:0.0.0.0:24945&#39;</span>
<span class="line">[2021-09-01 01:31:10.587][1][info][config] [source/server/listener_manager_impl.cc:888] all dependencies initialized. starting workers</span>
<span class="line">[2021-09-01 01:46:10.592][1][info][main] [source/server/drain_manager_impl.cc:70] shutting down parent after drain</span>
<span class="line"></span></code></pre></div><h2 id="dns-쿼리" tabindex="-1"><a class="header-anchor" href="#dns-쿼리"><span>DNS 쿼리</span></a></h2><div class="hint-container warning"><p class="hint-container-title">경고</p><p>주의할점은 DNS를 사용하는 경우, 예를들어 template 작성시 namespace가 추가되면 경로상 datacenter도 정의해줘야 인식하는 것으로 보임</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[tag.]&lt;service&gt;.service.&lt;namespace&gt;.&lt;datacenter&gt;.&lt;domain&gt;</span>
<span class="line"></span></code></pre></div><p>참고 링크 : <a href="https://www.consul.io/docs/discovery/dns#namespaced-services" target="_blank" rel="noopener noreferrer">https://www.consul.io/docs/discovery/dns#namespaced-services</a></p></div><p><strong>기존 템플릿</strong></p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">defaults</span>
<span class="line">   mode http</span>
<span class="line"></span>
<span class="line">frontend http_front</span>
<span class="line">   bind *:28888</span>
<span class="line">   default_backend http_back</span>
<span class="line"></span>
<span class="line">backend http_back</span>
<span class="line">    balance roundrobin</span>
<span class="line highlighted">    server-template mywebapp 2 _frontend._tcp.service.consul resolvers consul resolve-opts allow-dup-ip resolve-prefer ipv4 check</span>
<span class="line"></span>
<span class="line">resolvers consul</span>
<span class="line">  nameserver consul 127.0.0.1:8600</span>
<span class="line">  accepted_payload_size 8192</span>
<span class="line">  hold valid 5s</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/haproxy.cfg&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Namespace 적용 템플릿</strong></p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">defaults</span>
<span class="line">   mode http</span>
<span class="line"></span>
<span class="line">frontend http_front</span>
<span class="line">   bind *:28888</span>
<span class="line">   default_backend http_back</span>
<span class="line"></span>
<span class="line">backend http_back</span>
<span class="line">    balance roundrobin</span>
<span class="line highlighted">    server-template mywebapp 2 _frontend._tcp.service.mesh.hashistack.consul resolvers consul resolve-opts allow-dup-ip resolve-prefer ipv4 check</span>
<span class="line"></span>
<span class="line">resolvers consul</span>
<span class="line">  nameserver consul 127.0.0.1:8600</span>
<span class="line">  accepted_payload_size 8192</span>
<span class="line">  hold valid 5s</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/haproxy.cfg&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>Full Example (mesh.nomad)</summary><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment"># nomad namespace apply -description &quot;ServiceMesh Sample&quot; mesh</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">mode</span>     <span class="token punctuation">=</span> <span class="token string">&quot;Legacy&quot;</span></span>
<span class="line">  <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;mesh&quot;</span></span>
<span class="line">  <span class="token comment">#artifact = &quot;https://hashicorpjp.s3.ap-northeast-1.amazonaws.com/masa/Snapshots2021Jan_Nomad/frontback.tgz&quot;</span></span>
<span class="line">  <span class="token property">artifact</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/Great-Stone/Snapshots_2021Jan_Pseudo-containerized/raw/main/frontback.tgz&quot;</span></span>
<span class="line">  <span class="token property">node</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/Great-Stone/Snapshots_2021Jan_Pseudo-containerized/raw/main/nodejs-linux&quot;</span></span>
<span class="line">  <span class="token property">subject</span>    <span class="token punctuation">=</span> <span class="token string">&quot;snapshot&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variables</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">frontend_port</span> <span class="token punctuation">=</span> <span class="token number">8080</span></span>
<span class="line">  <span class="token property">upstream_port</span> <span class="token punctuation">=</span> <span class="token number">10000</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;attrib_v1&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> object(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">version</span>    <span class="token punctuation">=</span> string</span>
<span class="line">    <span class="token property">task_count</span> <span class="token punctuation">=</span> number</span>
<span class="line">    <span class="token property">text_color</span> <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">version</span>    <span class="token punctuation">=</span> <span class="token string">&quot;v1&quot;</span></span>
<span class="line">    <span class="token property">task_count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token property">text_color</span> <span class="token punctuation">=</span> <span class="token string">&quot;green&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;attrib_v2&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> object(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">version</span>    <span class="token punctuation">=</span> string</span>
<span class="line">    <span class="token property">task_count</span> <span class="token punctuation">=</span> number</span>
<span class="line">    <span class="token property">text_color</span> <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">version</span>    <span class="token punctuation">=</span> <span class="token string">&quot;v2&quot;</span></span>
<span class="line">    <span class="token property">task_count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token property">text_color</span> <span class="token punctuation">=</span> <span class="token string">&quot;red&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;frontback_job&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">region</span> <span class="token punctuation">=</span> <span class="token string">&quot;global&quot;</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;hashistack&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">namespace</span> <span class="token punctuation">=</span> local.namespace</span>
<span class="line"></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">constraint</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">attribute</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>meta<span class="token punctuation">.</span>subject<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">    <span class="token property">value</span>     <span class="token punctuation">=</span> local.subject</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">#######################</span></span>
<span class="line">  <span class="token comment">#                     #</span></span>
<span class="line">  <span class="token comment">#      Backend v1     #</span></span>
<span class="line">  <span class="token comment">#                     #</span></span>
<span class="line">  <span class="token comment">#######################</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;backend_group_v1&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> var.attrib_v1<span class="token punctuation">[</span><span class="token string">&quot;task_count&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">namespace</span> <span class="token punctuation">=</span> local.namespace</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;bridge&quot;</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">sidecar_service</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">meta</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">version</span> <span class="token punctuation">=</span> var.attrib_v1<span class="token punctuation">[</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">        <span class="token property">path</span>     <span class="token punctuation">=</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">        <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;5s&quot;</span></span>
<span class="line">        <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;3s&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;Snapshots&quot;</span>,</span>
<span class="line">        <span class="token string">&quot;Backend&quot;</span>,</span>
<span class="line">        local.mode,</span>
<span class="line">        var.attrib_v1<span class="token punctuation">[</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;backend&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;exec&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.artifact</span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">COLOR</span>   <span class="token punctuation">=</span> var.attrib_v1<span class="token punctuation">[</span><span class="token string">&quot;text_color&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">MODE</span>    <span class="token punctuation">=</span> local.mode</span>
<span class="line">        <span class="token property">TASK_ID</span> <span class="token punctuation">=</span> NOMAD_ALLOC_INDEX</span>
<span class="line">        <span class="token property">ADDR</span>    <span class="token punctuation">=</span> NOMAD_ADDR_http</span>
<span class="line">        <span class="token property">PORT</span>    <span class="token punctuation">=</span> NOMAD_PORT_http</span>
<span class="line">        <span class="token property">VERSION</span> <span class="token punctuation">=</span> var.attrib_v1<span class="token punctuation">[</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token comment"># IMG_SRC		= &quot;\${local.img_dir}\${var.attrib_v1[&quot;version&quot;]}.png&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">32</span>  <span class="token comment"># reserve 32 MB</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">100</span> <span class="token comment"># reserve 100 MHz</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">reschedule</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">delay</span>          <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">      <span class="token property">delay_function</span> <span class="token punctuation">=</span> <span class="token string">&quot;constant&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">#######################</span></span>
<span class="line">  <span class="token comment">#                     #</span></span>
<span class="line">  <span class="token comment">#      Backend v2     #</span></span>
<span class="line">  <span class="token comment">#                     #</span></span>
<span class="line">  <span class="token comment">#######################</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;backend_group_v2&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> var.attrib_v2<span class="token punctuation">[</span><span class="token string">&quot;task_count&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">namespace</span> <span class="token punctuation">=</span> local.namespace</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;bridge&quot;</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">sidecar_service</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">meta</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">version</span> <span class="token punctuation">=</span> var.attrib_v2<span class="token punctuation">[</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">        <span class="token property">path</span>     <span class="token punctuation">=</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">        <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;5s&quot;</span></span>
<span class="line">        <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;3s&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;Snapshots&quot;</span>,</span>
<span class="line">        <span class="token string">&quot;Backend&quot;</span>,</span>
<span class="line">        local.mode,</span>
<span class="line">        var.attrib_v2<span class="token punctuation">[</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;backend&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;exec&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.artifact</span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">COLOR</span>   <span class="token punctuation">=</span> var.attrib_v2<span class="token punctuation">[</span><span class="token string">&quot;text_color&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">MODE</span>    <span class="token punctuation">=</span> local.mode</span>
<span class="line">        <span class="token property">TASK_ID</span> <span class="token punctuation">=</span> NOMAD_ALLOC_INDEX</span>
<span class="line">        <span class="token property">ADDR</span>    <span class="token punctuation">=</span> NOMAD_ADDR_http</span>
<span class="line">        <span class="token property">PORT</span>    <span class="token punctuation">=</span> NOMAD_PORT_http</span>
<span class="line">        <span class="token property">VERSION</span> <span class="token punctuation">=</span> var.attrib_v2<span class="token punctuation">[</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token comment"># IMG_SRC		= &quot;\${local.img_dir}\${var.attrib_v2[&quot;version&quot;]}.png&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">32</span>  <span class="token comment"># reserve 32 MB</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">100</span> <span class="token comment"># reserve 100 MHz</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">reschedule</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">delay</span>          <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">      <span class="token property">delay_function</span> <span class="token punctuation">=</span> <span class="token string">&quot;constant&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">######################</span></span>
<span class="line">  <span class="token comment">#                    #</span></span>
<span class="line">  <span class="token comment">#      Frontend      #</span></span>
<span class="line">  <span class="token comment">#                    #</span></span>
<span class="line">  <span class="token comment">######################</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;frontend_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">namespace</span> <span class="token punctuation">=</span> local.namespace</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;bridge&quot;</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// static = var.frontend_port</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;frontend&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">sidecar_service</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">proxy</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">upstreams</span> <span class="token punctuation">{</span></span>
<span class="line">              <span class="token property">destination_name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">              <span class="token property">local_bind_port</span>  <span class="token punctuation">=</span> var.upstream_port</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">			<span class="token comment">// check {</span></span>
<span class="line">			<span class="token comment">// 	type     = &quot;http&quot;</span></span>
<span class="line">			<span class="token comment">// 	path     = &quot;/&quot;</span></span>
<span class="line">			<span class="token comment">// 	interval = &quot;5s&quot;</span></span>
<span class="line">			<span class="token comment">// 	timeout  = &quot;3s&quot;</span></span>
<span class="line">			<span class="token comment">// }</span></span>
<span class="line"></span>
<span class="line">      <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">        local.mode,</span>
<span class="line">        <span class="token string">&quot;Snapshots&quot;</span>,</span>
<span class="line">        <span class="token string">&quot;Frontend&quot;</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;frontend&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;exec&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.node</span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">PORT</span>         <span class="token punctuation">=</span> NOMAD_PORT_http</span>
<span class="line">        <span class="token property">UPSTREAM_URL</span> <span class="token punctuation">=</span> <span class="token string">&quot;http://<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_UPSTREAM_ADDR_backend<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;nodejs-linux&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">32</span>  <span class="token comment"># reserve 32 MB</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">100</span> <span class="token comment"># reserve 100 MHz</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">reschedule</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">delay</span>          <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">      <span class="token property">delay_function</span> <span class="token punctuation">=</span> <span class="token string">&quot;constant&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">######################</span></span>
<span class="line">  <span class="token comment">#                    #</span></span>
<span class="line">  <span class="token comment">#      haproxy      #</span></span>
<span class="line">  <span class="token comment">#                    #</span></span>
<span class="line">  <span class="token comment">######################</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;haproxy&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">consul</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">namespace</span> <span class="token punctuation">=</span> local.namespace</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">28888</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      port <span class="token string">&quot;stats&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">21936</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;haproxy&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span>        <span class="token punctuation">=</span> <span class="token string">&quot;haproxy:2.0&quot;</span></span>
<span class="line">        <span class="token property">network_mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">volumes</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;local/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg&quot;</span>,</span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">ports</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span>, <span class="token string">&quot;stats&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">defaults</span>
<span class="line">   mode http</span>
<span class="line"></span>
<span class="line">frontend stats</span>
<span class="line">   bind *:21936</span>
<span class="line">   stats uri /</span>
<span class="line">   stats show-legends</span>
<span class="line">   no log</span>
<span class="line"></span>
<span class="line">frontend http_front</span>
<span class="line">   bind *:28888</span>
<span class="line">   default_backend http_back</span>
<span class="line"></span>
<span class="line">backend http_back</span>
<span class="line">    balance roundrobin</span>
<span class="line">    server-template mywebapp 2 _frontend._tcp.service.mesh.hashistack.consul resolvers consul resolve-opts allow-dup-ip resolve-prefer ipv4 check</span>
<span class="line"></span>
<span class="line">resolvers consul</span>
<span class="line">  nameserver consul 127.0.0.1:8600</span>
<span class="line">  accepted_payload_size 8192</span>
<span class="line">  hold valid 5s</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/haproxy.cfg&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;haproxy&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">name</span>     <span class="token punctuation">=</span> <span class="token string">&quot;alive&quot;</span></span>
<span class="line">          <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">          <span class="token property">port</span>     <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">200</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">128</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">mbits</span> <span class="token punctuation">=</span> <span class="token number">10</span></span>
<span class="line"></span>
<span class="line">          <span class="token comment">// port &quot;http&quot; {</span></span>
<span class="line">          <span class="token comment">//   static = 28888</span></span>
<span class="line">          <span class="token comment">//   to = 8888</span></span>
<span class="line">          <span class="token comment">// }</span></span>
<span class="line"></span>
<span class="line">          <span class="token comment">// port &quot;stats&quot; {</span></span>
<span class="line">          <span class="token comment">//   static = 21936</span></span>
<span class="line">          <span class="token comment">//   to = 1936</span></span>
<span class="line">          <span class="token comment">// }</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,17),i=[l];function t(c,o){return n(),a("div",null,i)}const d=s(e,[["render",t],["__file","consul-namespace.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/02-Config/consul-namespace.html","title":"Consul namespace 사용시 Nomad의 서비스 등록","lang":"ko-KR","frontmatter":{"description":"With Consul Namespace","tag":["Nomad","Enterprise","Consul"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/02-Config/consul-namespace.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Consul namespace 사용시 Nomad의 서비스 등록"}],["meta",{"property":"og:description","content":"With Consul Namespace"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Enterprise"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Consul namespace 사용시 Nomad의 서비스 등록\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Job의 Consul Namespace 정의","slug":"job의-consul-namespace-정의","link":"#job의-consul-namespace-정의","children":[]},{"level":2,"title":"Service Mesh Upstream","slug":"service-mesh-upstream","link":"#service-mesh-upstream","children":[]},{"level":2,"title":"DNS 쿼리","slug":"dns-쿼리","link":"#dns-쿼리","children":[]}],"git":{"createdTime":1630463356000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":2}]},"readingTime":{"minutes":13.97,"words":838},"filePathRelative":"04-HashiCorp/07-Nomad/02-Config/consul-namespace.md","localizedDate":"2021년 9월 1일","excerpt":"\\n<h2>Job의 Consul Namespace 정의</h2>\\n<p>Consul Enterprise는 <code>Namespace</code>가 있어서 Nomad로 Consul에 서비스 등록 시 특정 Namespace를 지정할 수 있음</p>\\n<p>Job &gt; Group &gt; Consul</p>\\n<div class=\\"language-hcl\\" data-highlighter=\\"prismjs\\" data-ext=\\"hcl\\" data-title=\\"hcl\\"><pre class=\\"language-hcl\\"><code><span class=\\"line\\">job <span class=\\"token string\\">\\"frontback_job\\"</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  group <span class=\\"token string\\">\\"backend_group_v1\\"</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">count</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token number\\">1</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line highlighted\\">    <span class=\\"token keyword\\">consul</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line highlighted\\">      <span class=\\"token property\\">namespace</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"mynamespace\\"</span></span>\\n<span class=\\"line highlighted\\">    <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">    <span class=\\"token keyword\\">service</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">name</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"backend\\"</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">port</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"http\\"</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">      <span class=\\"token keyword\\">connect</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">        <span class=\\"token keyword\\">sidecar_service</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">      <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">      <span class=\\"token keyword\\">check</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">        <span class=\\"token property\\">type</span>     <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"http\\"</span></span>\\n<span class=\\"line\\">        <span class=\\"token property\\">path</span>     <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"/\\"</span></span>\\n<span class=\\"line\\">        <span class=\\"token property\\">interval</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"5s\\"</span></span>\\n<span class=\\"line\\">        <span class=\\"token property\\">timeout</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"3s\\"</span></span>\\n<span class=\\"line\\">      <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token comment\\"># 생략</span></span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{d as comp,v as data};
