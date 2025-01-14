import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as e,o as l,c as i,a as s,b as p,w as t,h as c,g as o}from"./app-DhMJQ1_3.js";const r="/assets/nomad_das-DbYtaXiA.png",u={},d=s("h1",{id:"dynamic-application-sizing",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#dynamic-application-sizing"},[s("span",null,"Dynamic application sizing")])],-1),v=s("ul",null,[s("li",null,"Nomad autoscaler 배포 후 사용할 수 있는 기능 중에 하나"),s("li",null,"Dynamic application sizing(DAS)의 기능이 설정되어 있는 job을 배포 한 이후 autoscaler job에서 resource의 권고를 받아올 수 있음"),s("li",null,"권고 받은 값을 사용자가 확인 후 허용할 경우 job의 resource의 변화가 정상적으로 적용됨")],-1),m=s("h2",{id:"autoscaler-job은-기존에-사용하던-job을-사용",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#autoscaler-job은-기존에-사용하던-job을-사용"},[s("span",null,"autoscaler job은 기존에 사용하던 job을 사용")])],-1),k=c(`<div class="hint-container tip"><p class="hint-container-title">팁</p><p>테스트 및 사용전 확인해야 할 사항은 Nomad의 enterprise, 즉 라이선스가 필요하며, nomad-autosclaer의 경우에도 enterprise여야만 합니다.</p></div><h3 id="demo-job의-배포" tabindex="-1"><a class="header-anchor" href="#demo-job의-배포"><span>Demo job의 배포</span></a></h3><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;example&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;cache-lb&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    network <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string-literal"><span class="token string">&quot;lb&quot;</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;docker&quot;</span></span></span>
<span class="line"></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        image <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span></span>
<span class="line">        ports <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;lb&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">        volumes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token comment"># It&#39;s safe to mount this path as a file because it won&#39;t re-render.</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;local/nginx.conf:/etc/nginx/nginx.conf&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token comment"># This path hosts files that will re-render with Consul Template.</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;local/nginx:/etc/nginx/conf.d&quot;</span></span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment"># This template overwrites the embedded nginx.conf file so it loads</span></span>
<span class="line">      <span class="token comment"># conf.d/*.conf files outside of the \`http\` block.</span></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data        <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">user  nginx;</span>
<span class="line">worker_processes  1;</span>
<span class="line">error_log  /var/log/nginx/error.log warn;</span>
<span class="line">pid        /var/run/nginx.pid;</span>
<span class="line">events {</span>
<span class="line">    worker_connections  1024;</span>
<span class="line">}</span>
<span class="line">include /etc/nginx/conf.d/*.conf;</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;local/nginx.conf&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment"># This template creates a TCP proxy to Redis.</span></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data          <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">stream {</span>
<span class="line">  server {</span>
<span class="line">    listen {{ env &quot;NOMAD_PORT_lb&quot; }};</span>
<span class="line">    proxy_pass backend;</span>
<span class="line">  }</span>
<span class="line">  upstream backend {</span>
<span class="line">  {{ range nomadService &quot;redis&quot; }}</span>
<span class="line">    server {{ .Address }}:{{ .Port }};</span>
<span class="line">  {{ else }}server 127.0.0.1:65535; # force a 502</span>
<span class="line">  {{ end }}</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;local/nginx/nginx.conf&quot;</span></span></span>
<span class="line">        change_mode   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;signal&quot;</span></span></span>
<span class="line">        change_signal <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;SIGHUP&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">50</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      scaling <span class="token string-literal"><span class="token string">&quot;cpu&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        policy <span class="token punctuation">{</span></span>
<span class="line">          cooldown            <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;1m&quot;</span></span></span>
<span class="line">          evaluation_interval <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10s&quot;</span></span></span>
<span class="line"></span>
<span class="line">          check <span class="token string-literal"><span class="token string">&quot;95pct&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">            strategy <span class="token string-literal"><span class="token string">&quot;app-sizing-percentile&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">              percentile <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;95&quot;</span></span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      scaling <span class="token string-literal"><span class="token string">&quot;mem&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        policy <span class="token punctuation">{</span></span>
<span class="line">          cooldown            <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;1m&quot;</span></span></span>
<span class="line">          evaluation_interval <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10s&quot;</span></span></span>
<span class="line"></span>
<span class="line">          check <span class="token string-literal"><span class="token string">&quot;max&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">            strategy <span class="token string-literal"><span class="token string">&quot;app-sizing-max&quot;</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    service <span class="token punctuation">{</span></span>
<span class="line">      name         <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;redis-lb&quot;</span></span></span>
<span class="line">      port         <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;lb&quot;</span></span></span>
<span class="line">      address_mode <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;host&quot;</span></span></span>
<span class="line">      provider     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;nomad&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;cache&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"></span>
<span class="line">    network <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string-literal"><span class="token string">&quot;db&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        to <span class="token operator">=</span> <span class="token number">6379</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;redis&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;docker&quot;</span></span></span>
<span class="line"></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        image <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;redis:6.0&quot;</span></span></span>
<span class="line">        ports <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;db&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">500</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">256</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      scaling <span class="token string-literal"><span class="token string">&quot;cpu&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        policy <span class="token punctuation">{</span></span>
<span class="line">          cooldown            <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;1m&quot;</span></span></span>
<span class="line">          evaluation_interval <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10s&quot;</span></span></span>
<span class="line"></span>
<span class="line">          check <span class="token string-literal"><span class="token string">&quot;95pct&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">            strategy <span class="token string-literal"><span class="token string">&quot;app-sizing-percentile&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">              percentile <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;95&quot;</span></span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      scaling <span class="token string-literal"><span class="token string">&quot;mem&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        policy <span class="token punctuation">{</span></span>
<span class="line">          cooldown            <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;1m&quot;</span></span></span>
<span class="line">          evaluation_interval <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10s&quot;</span></span></span>
<span class="line"></span>
<span class="line">          check <span class="token string-literal"><span class="token string">&quot;max&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">            strategy <span class="token string-literal"><span class="token string">&quot;app-sizing-max&quot;</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      service <span class="token punctuation">{</span></span>
<span class="line">        name         <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;redis&quot;</span></span></span>
<span class="line">        port         <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;db&quot;</span></span></span>
<span class="line">        address_mode <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;host&quot;</span></span></span>
<span class="line">        provider     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;nomad&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="부하-테스트용-job-배포" tabindex="-1"><a class="header-anchor" href="#부하-테스트용-job-배포"><span>부하 테스트용 job 배포</span></a></h3><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;das-load-test&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  type        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span></span>
<span class="line"></span>
<span class="line">  parameterized <span class="token punctuation">{</span></span>
<span class="line">    payload       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;optional&quot;</span></span></span>
<span class="line">    meta_optional <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;requests&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;clients&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;redis-benchmark&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;redis-benchmark&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;docker&quot;</span></span></span>
<span class="line"></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        image   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;redis:6.0&quot;</span></span></span>
<span class="line">        command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;redis-benchmark&quot;</span></span></span>
<span class="line"></span>
<span class="line">        args <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;-h&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;\${HOST}&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;-p&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;\${PORT}&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;-n&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;\${REQUESTS}&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;-c&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;\${CLIENTS}&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;secrets/env.txt&quot;</span></span></span>
<span class="line">        env         <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">        data <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">{{ with nomadService &quot;redis-lb&quot; }}{{ with index . 0 -}}</span>
<span class="line">HOST={{.Address}}</span>
<span class="line">PORT={{.Port}}</span>
<span class="line">{{- end }}{{ end }}</span>
<span class="line">REQUESTS={{ or (env &quot;NOMAD_META_requests&quot;) &quot;100000&quot; }}</span>
<span class="line">CLIENTS={{  or (env &quot;NOMAD_META_clients&quot;) &quot;50&quot; }}</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">128</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="부하테스트를-진행하고-nomad-ui에서-optimize의-recommended의-값이-변화하였고-accept를-눌러-줄-경우-target-job의-스펙이-변화합니다" tabindex="-1"><a class="header-anchor" href="#부하테스트를-진행하고-nomad-ui에서-optimize의-recommended의-값이-변화하였고-accept를-눌러-줄-경우-target-job의-스펙이-변화합니다"><span>부하테스트를 진행하고 nomad ui에서 Optimize의 Recommended의 값이 변화하였고, Accept를 눌러 줄 경우 target job의 스펙이 변화합니다.</span></a></h3><figure><img src="`+r+'" alt="nomad Optimize" tabindex="0" loading="lazy"><figcaption>nomad Optimize</figcaption></figure>',7);function b(g,q){const n=e("RouteLink");return l(),i("div",null,[d,v,m,s("ul",null,[s("li",null,[p(n,{to:"/04-HashiCorp/07-Nomad/05-SampleJob/DAS.html"},{default:t(()=>[o("AutoScaler job")]),_:1})])]),k])}const _=a(u,[["render",b],["__file","DAS.html.vue"]]),j=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/DAS.html","title":"Dynamic application sizing","lang":"ko-KR","frontmatter":{"description":"Nomad Dynamic application sizing","tag":["Nomad","sample","job","autoscaler","das"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/DAS.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Dynamic application sizing"}],["meta",{"property":"og:description","content":"Nomad Dynamic application sizing"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"sample"}],["meta",{"property":"article:tag","content":"job"}],["meta",{"property":"article:tag","content":"autoscaler"}],["meta",{"property":"article:tag","content":"das"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Dynamic application sizing\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"autoscaler job은 기존에 사용하던 job을 사용","slug":"autoscaler-job은-기존에-사용하던-job을-사용","link":"#autoscaler-job은-기존에-사용하던-job을-사용","children":[{"level":3,"title":"Demo job의 배포","slug":"demo-job의-배포","link":"#demo-job의-배포","children":[]},{"level":3,"title":"부하 테스트용 job 배포","slug":"부하-테스트용-job-배포","link":"#부하-테스트용-job-배포","children":[]},{"level":3,"title":"부하테스트를 진행하고 nomad ui에서 Optimize의 Recommended의 값이 변화하였고, Accept를 눌러 줄 경우 target job의 스펙이 변화합니다.","slug":"부하테스트를-진행하고-nomad-ui에서-optimize의-recommended의-값이-변화하였고-accept를-눌러-줄-경우-target-job의-스펙이-변화합니다","link":"#부하테스트를-진행하고-nomad-ui에서-optimize의-recommended의-값이-변화하였고-accept를-눌러-줄-경우-target-job의-스펙이-변화합니다","children":[]}]}],"git":{"createdTime":1664763179000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"swbs90","email":"swbs90@naver.com","commits":1}]},"readingTime":{"minutes":6.17,"words":370},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/DAS.md","localizedDate":"2022년 10월 3일","excerpt":"\\n<ul>\\n<li>Nomad autoscaler 배포 후 사용할 수 있는 기능 중에 하나</li>\\n<li>Dynamic application sizing(DAS)의 기능이 설정되어 있는 job을 배포 한 이후 autoscaler job에서 resource의 권고를 받아올 수 있음</li>\\n<li>권고 받은 값을 사용자가 확인 후 허용할 경우 job의 resource의 변화가 정상적으로 적용됨</li>\\n</ul>\\n<h2>autoscaler job은 기존에 사용하던 job을 사용</h2>\\n<ul>\\n<li><a href=\\"/04-HashiCorp/07-Nomad/05-SampleJob/DAS.html\\" target=\\"_blank\\">AutoScaler job</a></li>\\n</ul>"}');export{_ as comp,j as data};
