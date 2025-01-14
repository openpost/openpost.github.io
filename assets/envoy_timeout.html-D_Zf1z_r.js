import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const p={},t=e(`<h1 id="envoy-timeout" tabindex="-1"><a class="header-anchor" href="#envoy-timeout"><span>Envoy Timeout</span></a></h1><blockquote><p>Consul API : <a href="https://www.consul.io/api-docs/config" target="_blank" rel="noopener noreferrer">https://www.consul.io/api-docs/config</a><br> Proxy Default : <a href="https://www.consul.io/docs/connect/config-entries/proxy-defaults" target="_blank" rel="noopener noreferrer">https://www.consul.io/docs/connect/config-entries/proxy-defaults</a><br> Envoy Integration : <a href="https://www.consul.io/docs/connect/proxies/envoy" target="_blank" rel="noopener noreferrer">https://www.consul.io/docs/connect/proxies/envoy</a></p></blockquote><h2 id="단계-1-deployment-sample" tabindex="-1"><a class="header-anchor" href="#단계-1-deployment-sample"><span>단계 1. Deployment Sample</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./gs-frontend.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">---</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Service</span>
<span class="line">metadata:</span>
<span class="line">  name: gs-frontend</span>
<span class="line">spec:</span>
<span class="line">  selector:</span>
<span class="line">    app: gs-frontend</span>
<span class="line">  ports:</span>
<span class="line">    - protocol: TCP</span>
<span class="line">      port: 3000</span>
<span class="line">      targetPort: 3000</span>
<span class="line">---</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ServiceAccount</span>
<span class="line">metadata:</span>
<span class="line">  name: gs-frontend</span>
<span class="line">---</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: gs-frontend</span>
<span class="line">spec:</span>
<span class="line">  replicas: 1</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: gs-frontend</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      annotations:</span>
<span class="line">        consul.hashicorp.com/connect-inject: &quot;true&quot;</span>
<span class="line">        consul.hashicorp.com/transparent-proxy: &quot;false&quot;</span>
<span class="line">        consul.hashicorp.com/connect-service-upstreams: &quot;gs-backend:8080&quot;</span>
<span class="line">      labels:</span>
<span class="line">        app: gs-frontend</span>
<span class="line">    spec:</span>
<span class="line">      serviceAccountName: gs-frontend</span>
<span class="line">      containers:</span>
<span class="line">        - name: gs-frontend</span>
<span class="line">          image: hahohh/consul-frontend-nodejs:v1.5</span>
<span class="line">          env:</span>
<span class="line">            - name: PORT</span>
<span class="line">              value: &quot;3000&quot;</span>
<span class="line">            - name: UPSTREAM_URL</span>
<span class="line">              value: &quot;http://localhost:8080&quot;</span>
<span class="line">          ports:</span>
<span class="line">            - containerPort: 3000</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> ./gs-frontend.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="단계-2-config-dump-생성" tabindex="-1"><a class="header-anchor" href="#단계-2-config-dump-생성"><span>단계 2. config_dump 생성</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl <span class="token builtin class-name">exec</span> pod/<span class="token operator">&lt;</span>POD_ID<span class="token operator">&gt;</span> <span class="token parameter variable">-c</span> envoy-sidecar -- <span class="token function">wget</span> -qO- http://localhost:19000/config_dump</span>
<span class="line"></span></code></pre></div><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre class="language-json"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line"> <span class="token property">&quot;configs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">   <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.admin.v3.BootstrapConfigDump&quot;</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token property">&quot;bootstrap&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">     &lt;생략&gt;</span>
<span class="line">    <span class="token property">&quot;static_resources&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token property">&quot;clusters&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">       <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local_agent&quot;</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;STATIC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token property">&quot;connect_timeout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1s&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  &lt;생략&gt;</span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">   <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.admin.v3.ClustersConfigDump&quot;</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token property">&quot;static_clusters&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">     <span class="token property">&quot;cluster&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.config.cluster.v3.Cluster&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local_agent&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;STATIC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;connect_timeout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1s&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;http2_protocol_options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      </span>
<span class="line">  &lt;생략&gt;</span>
<span class="line">   <span class="token property">&quot;dynamic_active_clusters&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">     <span class="token property">&quot;version_info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eb3fa9f7104047dd6420d0eb13fd556995d2c6e7d687c4db07b759408ecf0345&quot;</span><span class="token punctuation">,</span></span>
<span class="line">     <span class="token property">&quot;cluster&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.config.cluster.v3.Cluster&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gs-backend.default.dc1.internal.a3568e3d-e611-5f3e-01b9-24ec787ce275.consul&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;EDS&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;eds_cluster_config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token property">&quot;eds_config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;ads&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;resource_api_version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;V3&quot;</span></span>
<span class="line">       <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;connect_timeout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;5s&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;circuit_breakers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  &lt;생략&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>일부 기본 timeout 값은 기본값 <ul><li>static_resources.clusters.*.connect_timeout : &quot;1s&quot;</li><li>dynamic_active_clusters.*.connect_timeout : &quot;5s&quot;</li></ul></li></ul><h2 id="단계-3-proxydefaults-설정" tabindex="-1"><a class="header-anchor" href="#단계-3-proxydefaults-설정"><span>단계 3. ProxyDefaults 설정</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./proxydefaults.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: consul.hashicorp.com/v1alpha1</span>
<span class="line">kind: ProxyDefaults</span>
<span class="line">metadata:</span>
<span class="line">  name: global</span>
<span class="line">spec:</span>
<span class="line">  config:</span>
<span class="line">    protocol: http</span>
<span class="line">    local_connect_timeout_ms: 60000</span>
<span class="line">    local_request_timeout_ms: 60000</span>
<span class="line">    upstreamConfig:</span>
<span class="line">      defaults:</span>
<span class="line">        protocol: http</span>
<span class="line">        connectTimeoutMs : 60000</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> ./proxydefaults.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="단계-4-consul-api-에서-proxy-default-값-변경-확인" tabindex="-1"><a class="header-anchor" href="#단계-4-consul-api-에서-proxy-default-값-변경-확인"><span>단계 4. Consul API 에서 <code>proxy-default</code> 값 변경 확인</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl <span class="token builtin class-name">exec</span> pod/consul-server-0 -- <span class="token function">wget</span> -qO- http://localhost:8500/v1/config/proxy-defaults/global <span class="token operator">|</span> jq <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;Kind&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;proxy-defaults&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;global&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;local_connect_timeout_ms&quot;</span><span class="token builtin class-name">:</span> <span class="token number">60000</span>,</span>
<span class="line">    <span class="token string">&quot;local_request_timeout_ms&quot;</span><span class="token builtin class-name">:</span> <span class="token number">60000</span>,</span>
<span class="line">    <span class="token string">&quot;protocol&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;http&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;upstreamConfig&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string">&quot;defaults&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">&quot;connectTimeoutMs&quot;</span><span class="token builtin class-name">:</span> <span class="token number">60000</span>,</span>
<span class="line">        <span class="token string">&quot;protocol&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span>,</span>
<span class="line">  <span class="token string">&quot;TransparentProxy&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,</span>
<span class="line">  <span class="token string">&quot;MeshGateway&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,</span>
<span class="line">  <span class="token string">&quot;Expose&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,</span>
<span class="line">  <span class="token string">&quot;Meta&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;consul.hashicorp.com/source-datacenter&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;dc1&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;external-source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;kubernetes&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span>,</span>
<span class="line">  <span class="token string">&quot;Partition&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;Namespace&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;CreateIndex&quot;</span><span class="token builtin class-name">:</span> <span class="token number">354</span>,</span>
<span class="line">  <span class="token string">&quot;ModifyIndex&quot;</span><span class="token builtin class-name">:</span> <span class="token number">354</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="단계-5-config-dump-재생성" tabindex="-1"><a class="header-anchor" href="#단계-5-config-dump-재생성"><span>단계 5. config_dump 재생성</span></a></h2><ul><li>Pod 재기동 없이 dump 확인 <ul><li>dynamic_active_clusters.connect_timeout : &quot;60s&quot;</li><li><a href="http://type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager" target="_blank" rel="noopener noreferrer">type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager</a> route timeout : &quot;60s&quot;</li><li><a href="http://type.googleapis.com/envoy.config.route.v3.RouteConfiguration" target="_blank" rel="noopener noreferrer">type.googleapis.com/envoy.config.route.v3.RouteConfiguration</a> route timeout : &quot;60s&quot;</li></ul></li></ul><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre class="language-json"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line"> <span class="token property">&quot;configs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">   <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.admin.v3.BootstrapConfigDump&quot;</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token property">&quot;bootstrap&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  &lt;생략&gt;</span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">     <span class="token property">&quot;version_info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;c80b97864daee80ecc0335fdd5b67437b946ea76e77f848d0cd69d6d1ad330ea&quot;</span><span class="token punctuation">,</span></span>
<span class="line">     <span class="token property">&quot;cluster&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.config.cluster.v3.Cluster&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local_app&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;STATIC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;connect_timeout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60s&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;load_assignment&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  &lt;생략&gt;</span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">     <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener:10.0.1.162:20000&quot;</span><span class="token punctuation">,</span></span>
<span class="line">     <span class="token property">&quot;active_state&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;version_info&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4f8654a4ce70f346dd63c479b3b42b41c5a92eda52f6b2d38dab8ff4536923f3&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;listener&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.config.listener.v3.Listener&quot;</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener:10.0.1.162:20000&quot;</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;socket_address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">         <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10.0.1.162&quot;</span><span class="token punctuation">,</span></span>
<span class="line">         <span class="token property">&quot;port_value&quot;</span><span class="token operator">:</span> <span class="token number">20000</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">       <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token property">&quot;filter_chains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">         <span class="token property">&quot;filters&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">           <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;envoy.filters.network.http_connection_manager&quot;</span><span class="token punctuation">,</span></span>
<span class="line">           <span class="token property">&quot;typed_config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;stat_prefix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;route_config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">             <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener&quot;</span><span class="token punctuation">,</span></span>
<span class="line">             <span class="token property">&quot;virtual_hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">              <span class="token punctuation">{</span></span>
<span class="line">               <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener&quot;</span><span class="token punctuation">,</span></span>
<span class="line">               <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token string">&quot;*&quot;</span></span>
<span class="line">               <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">               <span class="token property">&quot;routes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                 <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                  <span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">                 <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                 <span class="token property">&quot;route&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                  <span class="token property">&quot;cluster&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local_app&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                  <span class="token property">&quot;timeout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60s&quot;</span></span>
<span class="line">  &lt;생략&gt;</span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">     <span class="token property">&quot;route_config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;@type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;type.googleapis.com/envoy.config.route.v3.RouteConfiguration&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;virtual_hosts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">       <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;public_listener&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;domains&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">         <span class="token string">&quot;*&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;routes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">         <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">           <span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">          <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token property">&quot;route&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">           <span class="token property">&quot;cluster&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local_app&quot;</span><span class="token punctuation">,</span></span>
<span class="line">           <span class="token property">&quot;timeout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60s&quot;</span></span>
<span class="line">  &lt;생략&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),l=[t];function o(i,c){return n(),a("div",null,l)}const d=s(p,[["render",o],["__file","envoy_timeout.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/04-Consul/06-on_Kubernetes/configuration/envoy_timeout.html","title":"Envoy Timeout","lang":"ko-KR","frontmatter":{"description":"Consul Service Mesh on Kubernetes","tag":["Consul","ServiceMesh","K8s","Kubernetes","timeout"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/04-Consul/06-on_Kubernetes/configuration/envoy_timeout.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Envoy Timeout"}],["meta",{"property":"og:description","content":"Consul Service Mesh on Kubernetes"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"ServiceMesh"}],["meta",{"property":"article:tag","content":"K8s"}],["meta",{"property":"article:tag","content":"Kubernetes"}],["meta",{"property":"article:tag","content":"timeout"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Envoy Timeout\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"단계 1. Deployment Sample","slug":"단계-1-deployment-sample","link":"#단계-1-deployment-sample","children":[]},{"level":2,"title":"단계 2. config_dump 생성","slug":"단계-2-config-dump-생성","link":"#단계-2-config-dump-생성","children":[]},{"level":2,"title":"단계 3. ProxyDefaults 설정","slug":"단계-3-proxydefaults-설정","link":"#단계-3-proxydefaults-설정","children":[{"level":3,"title":"단계 4. Consul API 에서 proxy-default 값 변경 확인","slug":"단계-4-consul-api-에서-proxy-default-값-변경-확인","link":"#단계-4-consul-api-에서-proxy-default-값-변경-확인","children":[]}]},{"level":2,"title":"단계 5. config_dump 재생성","slug":"단계-5-config-dump-재생성","link":"#단계-5-config-dump-재생성","children":[]}],"git":{"createdTime":1648260872000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":6.42,"words":385},"filePathRelative":"04-HashiCorp/04-Consul/06-on_Kubernetes/configuration/envoy_timeout.md","localizedDate":"2022년 3월 26일","excerpt":"\\n<blockquote>\\n<p>Consul API : <a href=\\"https://www.consul.io/api-docs/config\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.consul.io/api-docs/config</a><br>\\nProxy Default : <a href=\\"https://www.consul.io/docs/connect/config-entries/proxy-defaults\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.consul.io/docs/connect/config-entries/proxy-defaults</a><br>\\nEnvoy Integration : <a href=\\"https://www.consul.io/docs/connect/proxies/envoy\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.consul.io/docs/connect/proxies/envoy</a></p>\\n</blockquote>"}');export{d as comp,v as data};
