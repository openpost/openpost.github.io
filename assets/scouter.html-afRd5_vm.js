import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const t={},p=e(`<h1 id="scouter" tabindex="-1"><a class="header-anchor" href="#scouter"><span>Scouter</span></a></h1><ul><li>공식 Github : <a href="https://github.com/scouter-project/scouter" target="_blank" rel="noopener noreferrer">https://github.com/scouter-project/scouter</a></li><li>Scouter 다운로드 <ul><li>scouter collector와 host-agent 를 실행하는 job에서 버전정보를 기반으로 다운로드</li><li>host agent는 <code>system</code> 타입으로 모든 노드에서 실행되도록 구성</li></ul></li><li>tomcat 다운로드 <ul><li>다운로드 받지않고 호스트에 미리 설치해 놓는 방식이 더 가벼워보임 --&gt; 아마도 Packer, Terraform의 조합이면 가능</li><li>다운로드 받게 구성하면 컨테이너처럼 Nomad가 배포할 때마다 다운받아서 구성 가능</li></ul></li><li>Template - server.xml <ul><li>server.xml 기본 구성에서 port가 선언되는 자리를 java option에서 받을 수 있도록 변경</li><li>Template 구성도 가능하고 미리 구성한 xml을 다운로드 받게 하는것도 괜찮아 보임</li></ul></li><li>Consul과 함께 구성된 경우 Nginx같은 LB 구성 Job 에서 backend를 동적으로 구성 가능</li><li>Nomad에 Scouter Collector와 Host Agent를 위한 별도 Namespace를 구성하는 것도 관리를 위해 좋아보임<br><code>nomad namespace apply -description &quot;scouter&quot; scouter</code></li></ul><h2 id="scouter-collector-server" tabindex="-1"><a class="header-anchor" href="#scouter-collector-server"><span>Scouter - Collector Server</span></a></h2><ul><li>Collector의 경우 Client 에서 연결하기 위해 고정된 포트를 지정해야 하므로 static 포트로 지정</li><li>Collector의 경우 data를 영구적으로 보관하기 위해서는 <code>Volume</code> 할당하는 것을 권장 <ul><li>database</li><li>logs</li></ul></li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;version&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;2.15.0&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;scouter의 버전 기입 또는 배포시 입력 받기&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">souter_release_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/scouter-project/scouter/releases/download/v<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>/scouter-min-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>.tar.gz&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;scouter-collector&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">// namespace = &quot;scouter&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;collector&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">scaling</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token property">min</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">      <span class="token property">max</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;collector&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;java&quot;</span></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">          port <span class="token string">&quot;collector&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">to</span> <span class="token punctuation">=</span> <span class="token number">6100</span></span>
<span class="line">            <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">6100</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token property">cpu</span> <span class="token punctuation">=</span> <span class="token number">500</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">512</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.souter_release_url</span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/local&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line"># Agent Control and Service Port(Default : TCP 6100)</span>
<span class="line">net_tcp_listen_port={{ env &quot;NOMAD_PORT_collector&quot; }}</span>
<span class="line"></span>
<span class="line"># UDP Receive Port(Default : 6100)</span>
<span class="line">net_udp_listen_port={{ env &quot;NOMAD_PORT_collector&quot; }}</span>
<span class="line"></span>
<span class="line"># DB directory(Default : ./database)</span>
<span class="line">db_dir=./database</span>
<span class="line"></span>
<span class="line"># Log directory(Default : ./logs)</span>
<span class="line">log_dir=./logs</span>
<span class="line">EOF</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/scouter/server/conf/scouter.conf&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">class_path</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/scouter/server/scouter-server-boot.jar&quot;</span></span>
<span class="line">        <span class="token property">class</span> <span class="token punctuation">=</span> <span class="token string">&quot;scouter.boot.Boot&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;local/scouter/server/lib&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;scouter-collector&quot;</span></span>
<span class="line">        <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;scouter&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;collector&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">type</span>  <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">          <span class="token property">port</span>  <span class="token punctuation">=</span> <span class="token string">&quot;collector&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scouter-host-agent" tabindex="-1"><a class="header-anchor" href="#scouter-host-agent"><span>Scouter - Host Agent</span></a></h2><ul><li>모든 Nomad Client 노드를 대상으로 구성하기 위해 <code>system</code> 타입으로 실행하나, 조건이 필요한 경우 Java가 있는 경우, 혹은 특정 노드에 대한 조건을 <code>Constrain</code>으로 구성할 수 있음</li><li>Collector Server의 정보를 Consul에서 동적으로 받아오도록 템플릿 구성</li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">// nomad namespace apply -description &quot;scouter&quot; scouter</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;version&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;2.15.0&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">souter_release_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/scouter-project/scouter/releases/download/v<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>/scouter-min-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>.tar.gz&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;scouter-host-agent&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">// namespace = &quot;scouter&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;system&quot;</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;agent&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;agent&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;java&quot;</span></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span> <span class="token punctuation">=</span> <span class="token number">100</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">128</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.souter_release_url</span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/local&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">obj_name=\${node.unique.name}</span>
<span class="line">{{ range service &quot;scouter-collector&quot; }}</span>
<span class="line">net_collector_ip={{ .Address }}</span>
<span class="line">net_collector_udp_port={{ .Port }}</span>
<span class="line">net_collector_tcp_port={{ .Port }}</span>
<span class="line">{{ end }}</span>
<span class="line">#cpu_warning_pct=80</span>
<span class="line">#cpu_fatal_pct=85</span>
<span class="line">#cpu_check_period_ms=60000</span>
<span class="line">#cpu_fatal_history=3</span>
<span class="line">#cpu_alert_interval_ms=300000</span>
<span class="line">#disk_warning_pct=88</span>
<span class="line">#disk_fatal_pct=92</span>
<span class="line">EOF</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/scouter/agent.host/conf/scouter.conf&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">class_path</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/scouter/agent.host/scouter.host.jar&quot;</span></span>
<span class="line">        <span class="token property">class</span> <span class="token punctuation">=</span> <span class="token string">&quot;scouter.boot.Boot&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;local/lib&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tomcat-sample" tabindex="-1"><a class="header-anchor" href="#tomcat-sample"><span>Tomcat Sample</span></a></h2><ul><li>Tomcat 서버 구성 시 Tomcat과 Scouter 모두를 다운받게 구성 <ul><li>둘 모두 다운받기 때문에 운영에서 구성하는 경우 필요한 파일들만 별도 압축하여 별도 관리하는 것을 권장</li></ul></li><li>구성에 따른 이름을 매번 다르게 구성하기 위해 변수 활용 <ul><li><code>-Dobj_name=Tomcat-\${node.unique.name}-\${NOMAD_PORT_http}</code></li></ul></li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;tomcat_version&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;10.0.14&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;scouter_version&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;2.15.0&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">tomcat_major_ver</span> <span class="token punctuation">=</span> split(<span class="token string">&quot;.&quot;</span>, var.tomcat_version)<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">tomcat_download_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://archive.apache.org/dist/tomcat/tomcat-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">tomcat_major_ver</span><span class="token punctuation">}</span></span>/v<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">tomcat_version</span><span class="token punctuation">}</span></span>/bin/apache-tomcat-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">tomcat_version</span><span class="token punctuation">}</span></span>.tar.gz&quot;</span></span>
<span class="line">  <span class="token property">souter_release_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/scouter-project/scouter/releases/download/v<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">scouter_version</span><span class="token punctuation">}</span></span>/scouter-min-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">scouter_version</span><span class="token punctuation">}</span></span>.tar.gz&quot;</span></span>
<span class="line">  <span class="token property">war_download_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://tomcat.apache.org/tomcat-10.0-doc/appdev/sample/sample.war&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;tomcat-scouter&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">// namespace = &quot;scouter&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;tomcat&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">scaling</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">      <span class="token property">min</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">      <span class="token property">max</span> <span class="token punctuation">=</span> <span class="token number">3</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;tomcat&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;raw_exec&quot;</span></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">          port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">          port <span class="token string">&quot;stop&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">          port <span class="token string">&quot;jmx&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token property">cpu</span> <span class="token punctuation">=</span> <span class="token number">500</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">512</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">APP_VERSION</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.1&quot;</span></span>
<span class="line">        <span class="token property">CATALINA_HOME</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_TASK_DIR<span class="token punctuation">}</span></span>/apache-tomcat-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">tomcat_version</span><span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">        <span class="token property">CATALINA_OPTS</span> <span class="token punctuation">=</span> <span class="token string">&quot;-Dport.http=$NOMAD_PORT_http -Dport.stop=$NOMAD_PORT_stop -Ddefault.context=$NOMAD_TASK_DIR -Xms256m -Xmx512m -javaagent:local/scouter/agent.java/scouter.agent.jar -Dscouter.config=local/conf/scouter.conf -Dobj_name=Tomcat-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>node<span class="token punctuation">.</span>unique<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>-<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_PORT_http<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">        <span class="token property">JAVA_HOME</span> <span class="token punctuation">=</span> <span class="token string">&quot;/usr/lib/jvm/java-11-openjdk-amd64&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.tomcat_download_url</span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/local&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.souter_release_url</span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/local&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> local.war_download_url</span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/local/webapps&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="line">&lt;Server port=&quot;\${port.stop}&quot; shutdown=&quot;SHUTDOWN&quot;&gt;</span>
<span class="line">    &lt;Listener className=&quot;org.apache.catalina.startup.VersionLoggerListener&quot;/&gt;</span>
<span class="line">    &lt;Listener className=&quot;org.apache.catalina.core.AprLifecycleListener&quot; SSLEngine=&quot;on&quot;/&gt;</span>
<span class="line">    &lt;Listener className=&quot;org.apache.catalina.core.JreMemoryLeakPreventionListener&quot;/&gt;</span>
<span class="line">    &lt;Listener className=&quot;org.apache.catalina.mbeans.GlobalResourcesLifecycleListener&quot;/&gt;</span>
<span class="line">    &lt;Listener className=&quot;org.apache.catalina.core.ThreadLocalLeakPreventionListener&quot;/&gt;</span>
<span class="line">    &lt;GlobalNamingResources&gt;</span>
<span class="line">        &lt;Resource name=&quot;UserDatabase&quot; auth=&quot;Container&quot; type=&quot;org.apache.catalina.UserDatabase&quot; description=&quot;User database that can be updated and saved&quot; factory=&quot;org.apache.catalina.users.MemoryUserDatabaseFactory&quot; pathname=&quot;conf/tomcat-users.xml&quot;/&gt;</span>
<span class="line">    &lt;/GlobalNamingResources&gt;</span>
<span class="line">    &lt;Service name=&quot;Catalina&quot;&gt;</span>
<span class="line">        &lt;Connector port=&quot;\${port.http}&quot; protocol=&quot;HTTP/1.1&quot; connectionTimeout=&quot;20000&quot;/&gt;</span>
<span class="line">        &lt;Engine name=&quot;Catalina&quot; defaultHost=&quot;localhost&quot;&gt;</span>
<span class="line">            &lt;Realm className=&quot;org.apache.catalina.realm.LockOutRealm&quot;&gt;</span>
<span class="line">                &lt;Realm className=&quot;org.apache.catalina.realm.UserDatabaseRealm&quot; resourceName=&quot;UserDatabase&quot;/&gt;</span>
<span class="line">            &lt;/Realm&gt;</span>
<span class="line">            &lt;Host name=&quot;localhost&quot; appBase=&quot;\${default.context}/webapps/&quot; unpackWARs=&quot;true&quot; autoDeploy=&quot;true&quot;&gt;</span>
<span class="line">                &lt;Valve className=&quot;org.apache.catalina.valves.AccessLogValve&quot; directory=&quot;logs&quot; prefix=&quot;localhost_access_log&quot; suffix=&quot;.txt&quot; pattern=&quot;%h %l %u %t &amp;quot;%r&amp;quot; %s %b&quot;/&gt;</span>
<span class="line">            &lt;/Host&gt;</span>
<span class="line">        &lt;/Engine&gt;</span>
<span class="line">    &lt;/Service&gt;</span>
<span class="line">&lt;/Server&gt;</span>
<span class="line">EOF</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/conf/server.xml&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">{{ range service &quot;scouter-collector&quot; }}</span>
<span class="line">net_collector_ip={{ .Address }}</span>
<span class="line">net_collector_udp_port={{ .Port }}</span>
<span class="line">net_collector_tcp_port={{ .Port }}</span>
<span class="line">{{ end }}</span>
<span class="line">#hook_method_patterns=sample.mybiz.*Biz.*,sample.service.*Service.*</span>
<span class="line">#trace_http_client_ip_header_key=X-Forwarded-For</span>
<span class="line">#profile_spring_controller_method_parameter_enabled=false</span>
<span class="line">#hook_exception_class_patterns=my.exception.TypedException</span>
<span class="line">#profile_fullstack_hooked_exception_enabled=true</span>
<span class="line">#hook_exception_handler_method_patterns=my.AbstractAPIController.fallbackHandler,my.ApiExceptionLoggingFilter.handleNotFoundErrorResponse</span>
<span class="line">#hook_exception_hanlder_exclude_class_patterns=exception.BizException</span>
<span class="line">EOF</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/conf/scouter.conf&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>CATALINA_HOME<span class="token punctuation">}</span></span>/bin/catalina.sh&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;run&quot;</span>, <span class="token string">&quot;-config&quot;</span>, <span class="token string">&quot;$NOMAD_TASK_DIR/conf/server.xml&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;tomcat-scouter&quot;</span></span>
<span class="line">        <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;tomcat&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">type</span>  <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">          <span class="token property">port</span>  <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;tomcat-scouter&quot;</span></span>
<span class="line">        <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;jmx&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;jmx&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),l=[p];function o(c,i){return n(),a("div",null,l)}const d=s(t,[["render",o],["__file","scouter.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/scouter.html","title":"Scouter","lang":"ko-KR","frontmatter":{"description":"Nomad + Consul Sample","tag":["Nomad","Consul","Scouter","Job"],"author":"GS","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/scouter.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Scouter"}],["meta",{"property":"og:description","content":"Nomad + Consul Sample"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:55:52.000Z"}],["meta",{"property":"article:author","content":"GS"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"Scouter"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:55:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Scouter\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T06:55:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GS\\"}]}"]]},"headers":[{"level":2,"title":"Scouter - Collector Server","slug":"scouter-collector-server","link":"#scouter-collector-server","children":[]},{"level":2,"title":"Scouter - Host Agent","slug":"scouter-host-agent","link":"#scouter-host-agent","children":[]},{"level":2,"title":"Tomcat Sample","slug":"tomcat-sample","link":"#tomcat-sample","children":[]}],"git":{"createdTime":1639485865000,"updatedTime":1709880952000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":10.17,"words":610},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/scouter.md","localizedDate":"2021년 12월 14일","excerpt":"\\n<ul>\\n<li>공식 Github : <a href=\\"https://github.com/scouter-project/scouter\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/scouter-project/scouter</a></li>\\n<li>Scouter 다운로드\\n<ul>\\n<li>scouter collector와 host-agent 를 실행하는 job에서 버전정보를 기반으로 다운로드</li>\\n<li>host agent는 <code>system</code> 타입으로 모든 노드에서 실행되도록 구성</li>\\n</ul>\\n</li>\\n<li>tomcat 다운로드\\n<ul>\\n<li>다운로드 받지않고 호스트에 미리 설치해 놓는 방식이 더 가벼워보임 --&gt; 아마도 Packer, Terraform의 조합이면 가능</li>\\n<li>다운로드 받게 구성하면 컨테이너처럼 Nomad가 배포할 때마다 다운받아서 구성 가능</li>\\n</ul>\\n</li>\\n<li>Template - server.xml\\n<ul>\\n<li>server.xml 기본 구성에서 port가 선언되는 자리를 java option에서 받을 수 있도록 변경</li>\\n<li>Template 구성도 가능하고 미리 구성한 xml을 다운로드 받게 하는것도 괜찮아 보임</li>\\n</ul>\\n</li>\\n<li>Consul과 함께 구성된 경우 Nginx같은 LB 구성 Job 에서 backend를 동적으로 구성 가능</li>\\n<li>Nomad에 Scouter Collector와 Host Agent를 위한 별도 Namespace를 구성하는 것도 관리를 위해 좋아보임<br>\\n<code>nomad namespace apply -description \\"scouter\\" scouter</code></li>\\n</ul>","copyright":{"author":"GS"}}');export{d as comp,v as data};
