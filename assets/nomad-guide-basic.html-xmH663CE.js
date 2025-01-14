import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},i=e(`<h1 id="nomad-guide-basic" tabindex="-1"><a class="header-anchor" href="#nomad-guide-basic"><span>Nomad Guide - Basic</span></a></h1><h2 id="download" tabindex="-1"><a class="header-anchor" href="#download"><span>Download</span></a></h2><ul><li>Release link : <a href="https://releases.hashicorp.com/nomad" target="_blank" rel="noopener noreferrer">https://releases.hashicorp.com/nomad</a></li><li>Version : 1.3.x</li><li>Platform 선택 <ul><li>darwin(= MAC)</li><li>Linux</li><li>Windows</li></ul></li></ul><h2 id="on-linux" tabindex="-1"><a class="header-anchor" href="#on-linux"><span>on Linux</span></a></h2><h3 id="구성-샘플" tabindex="-1"><a class="header-anchor" href="#구성-샘플"><span>구성 샘플</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">└── hashicorp</span>
<span class="line">    └── nomad</span>
<span class="line">         ├── config</span>
<span class="line">         └── data</span>
<span class="line"></span></code></pre></div><ul><li>Donwload 받은 압축을 해제하고 기존 <code>$PATH</code> 위치에 복사 하거나 등록 <ul><li>e.g. utuntu : /usr/local/bin</li><li>e.g. centos : /usr/bin</li></ul></li></ul><h3 id="server-config" tabindex="-1"><a class="header-anchor" href="#server-config"><span>Server Config</span></a></h3><p>&lt;/hashicorp/nomad/config/nomad.hcl&gt;</p><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">datacenter <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span></span>
<span class="line">data_dir <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;/hashicorp/nomad/data&quot;</span></span></span>
<span class="line"></span>
<span class="line">bind_addr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;0.0.0.0&quot;</span></span></span>
<span class="line"></span>
<span class="line">advertise <span class="token punctuation">{</span></span>
<span class="line">  http <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;{{ GetInterfaceIP \\&quot;eth1\\&quot; }}&quot;</span></span></span>
<span class="line">  rpc  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;{{ GetInterfaceIP \\&quot;eth1\\&quot; }}&quot;</span></span></span>
<span class="line">  serf <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;{{ GetInterfaceIP \\&quot;eth1\\&quot; }}&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">server <span class="token punctuation">{</span></span>
<span class="line">  enabled          <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">  bootstrap_expect <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>advertise 에 지정된 http, rpc, serf 의 IP는 직접 IP를 입력하는 것도 가능</li><li>go-discover 형태인 구문을 활용하면 인터페이스 이름을 넣어서 자동 IP 입력 가능<div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{{ GetInterfaceIP \\&quot;eth1\\&quot; }}</span>
<span class="line"></span></code></pre></div></li></ul><h3 id="client-config" tabindex="-1"><a class="header-anchor" href="#client-config"><span>Client Config</span></a></h3><p><code>retry_join</code>에 Server의 주소 꼭 넣기!</p><p>&lt;/hashicorp/nomad/config/nomad.hcl&gt;</p><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">datacenter <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span></span>
<span class="line">data_dir <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;/hashicorp/nomad/data&quot;</span></span></span>
<span class="line"></span>
<span class="line">bind_addr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;0.0.0.0&quot;</span></span></span>
<span class="line"></span>
<span class="line">server <span class="token punctuation">{</span></span>
<span class="line">  enabled <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">server_join <span class="token punctuation">{</span></span>
<span class="line">  retry_join <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;&lt;server_ip&gt;:4647&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">client <span class="token punctuation">{</span></span>
<span class="line">  enabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">  servers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;&lt;server_ip&gt;:4647&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  meta <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-literal"><span class="token string">&quot;key1&quot;</span></span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;value1&quot;</span></span></span>
<span class="line">    <span class="token string-literal"><span class="token string">&quot;key2&quot;</span></span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;value2&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  options <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-literal"><span class="token string">&quot;driver.raw_exec.enable&quot;</span></span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;1&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="systemctl-서비스-등록" tabindex="-1"><a class="header-anchor" href="#systemctl-서비스-등록"><span>Systemctl 서비스 등록</span></a></h3><blockquote><p><a href="https://learn.hashicorp.com/tutorials/nomad/production-deployment-guide-vm-with-consul" target="_blank" rel="noopener noreferrer">https://learn.hashicorp.com/tutorials/nomad/production-deployment-guide-vm-with-consul</a></p></blockquote><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">sudo</span> <span class="token function">touch</span> /etc/systemd/system/nomad.service</span>
<span class="line"></span></code></pre></div><ul><li><code>ExecStart</code>의 nomad 바이너리 경로에 주의!!!</li><li><code>ExecStart</code>의 <code>-config</code> 에 앞서 작성한 config 파일 디렉토리 경로 맞추기!!!</li><li>서버의 경우 User/Group을 일반 사용자로 구성</li><li>클라이언트(워커 노드)는 User/Group을 root로 구성</li></ul><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">Nomad</span></span>
<span class="line"><span class="token key attr-name">Documentation</span><span class="token punctuation">=</span><span class="token value attr-value">https://www.nomadproject.io/docs/</span></span>
<span class="line"><span class="token key attr-name">Wants</span><span class="token punctuation">=</span><span class="token value attr-value">network-online.target</span></span>
<span class="line"><span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Nomad server should be run as the nomad user. Nomad clients</span></span>
<span class="line"><span class="token comment"># should be run as root</span></span>
<span class="line"><span class="token key attr-name">User</span><span class="token punctuation">=</span><span class="token value attr-value">nomad</span></span>
<span class="line"><span class="token key attr-name">Group</span><span class="token punctuation">=</span><span class="token value attr-value">nomad</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">ExecReload</span><span class="token punctuation">=</span><span class="token value attr-value">/bin/kill -HUP $MAINPID</span></span>
<span class="line"><span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/bin/nomad agent -config /etc/nomad.d</span></span>
<span class="line"><span class="token key attr-name">KillMode</span><span class="token punctuation">=</span><span class="token value attr-value">process</span></span>
<span class="line"><span class="token key attr-name">KillSignal</span><span class="token punctuation">=</span><span class="token value attr-value">SIGINT</span></span>
<span class="line"><span class="token key attr-name">LimitNOFILE</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span></span>
<span class="line"><span class="token key attr-name">LimitNPROC</span><span class="token punctuation">=</span><span class="token value attr-value">infinity</span></span>
<span class="line"><span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-failure</span></span>
<span class="line"><span class="token key attr-name">RestartSec</span><span class="token punctuation">=</span><span class="token value attr-value">2</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## Configure unit start rate limiting. Units which are started more than</span></span>
<span class="line"><span class="token comment">## *burst* times within an *interval* time span are not permitted to start any</span></span>
<span class="line"><span class="token comment">## more. Use \`StartLimitIntervalSec\` or \`StartLimitInterval\` (depending on</span></span>
<span class="line"><span class="token comment">## systemd version) to configure the checking interval and \`StartLimitBurst\`</span></span>
<span class="line"><span class="token comment">## to configure how many starts per interval are allowed. The values in the</span></span>
<span class="line"><span class="token comment">## commented lines are defaults.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># StartLimitBurst = 5</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## StartLimitIntervalSec is used for systemd versions &gt;= 230</span></span>
<span class="line"><span class="token comment"># StartLimitIntervalSec = 10s</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## StartLimitInterval is used for systemd versions &lt; 230</span></span>
<span class="line"><span class="token comment"># StartLimitInterval = 10s</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">TasksMax</span><span class="token punctuation">=</span><span class="token value attr-value">infinity</span></span>
<span class="line"><span class="token key attr-name">OOMScoreAdjust</span><span class="token punctuation">=</span><span class="token value attr-value">-1000</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="실행-및-ui-확인" tabindex="-1"><a class="header-anchor" href="#실행-및-ui-확인"><span>실행 및 UI 확인</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ systemctl start nomad</span>
<span class="line">$ systemctl <span class="token builtin class-name">enable</span> nomad</span>
<span class="line"></span></code></pre></div><ul><li>UI 기본 포트 : 4646</li><li>http://&lt;server_ip&gt;:4646</li></ul><h2 id="job-실행" tabindex="-1"><a class="header-anchor" href="#job-실행"><span>Job 실행</span></a></h2><p>Job 실행은 CLI, API, UI 실행 가능</p><h3 id="cli" tabindex="-1"><a class="header-anchor" href="#cli"><span>CLI</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ <span class="token assign-left variable">NOMAD_ADDR</span><span class="token operator">=</span>http://<span class="token operator">&lt;</span>server_ip<span class="token operator">&gt;</span>:4646</span>
<span class="line">$ nomad job run <span class="token operator">&lt;</span>job_file_path<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="ui" tabindex="-1"><a class="header-anchor" href="#ui"><span>UI</span></a></h3><ul><li><code>http://&lt;server_ip&gt;:4646</code> 에 접속</li><li>왼쪽 메뉴의 <code>WORKLOAD/Jobs</code> 선택</li><li>우측의 <code>Run Job</code> 버튼 클릭</li><li>Job 내용 입력 후 <code>Plan</code>, <code>Apply</code></li></ul><h2 id="job-sample" tabindex="-1"><a class="header-anchor" href="#job-sample"><span>Job Sample</span></a></h2><h3 id="batch-basic" tabindex="-1"><a class="header-anchor" href="#batch-basic"><span>batch - basic</span></a></h3><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  </span>
<span class="line">  type        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span></span>
<span class="line">  </span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;batch-1&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;raw_exec&quot;</span></span></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">#!/bin/bash</span>
<span class="line">echo $(hostname) &gt; /tmp/check.txt</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">64</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;batch-2&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;raw_exec&quot;</span></span></span>
<span class="line">      artifact <span class="token punctuation">{</span></span>
<span class="line">        source <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;http://&lt;shared_ip&gt;:&lt;port&gt;/path/run.sh&quot;</span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;local&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;local/run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">64</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>driver</code>가 <code>raw_exec</code>이면 isolation 없이 스크립트를 실행하는 방식</li><li><code>template</code> 에서 작성하는 파일은 동적으로 생성되며 변수 조합도 가능</li><li><code>artifact</code>를 정의하여 중앙 저장소의 파일을 다운로드 받아 구성 가능</li><li>한번 정상 동작 후 Job은 종료됨(기록은 남으나 GC 후 최종적으로 삭제됨)</li></ul><h3 id="batch-periodic" tabindex="-1"><a class="header-anchor" href="#batch-periodic"><span>batch - periodic</span></a></h3><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;periodic&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  </span>
<span class="line">  type        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span></span>
<span class="line"></span>
<span class="line">  periodic <span class="token punctuation">{</span></span>
<span class="line">    cron             <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*/5 * * * * * *&quot;</span></span></span>
<span class="line">    prohibit_overlap <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">    time_zone        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Asia/Seoul&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  constraint <span class="token punctuation">{</span></span>
<span class="line">    attribute <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${attr.unique.hostname}&quot;</span></span></span>
<span class="line">    value     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;cn-client-2&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;raw_exec&quot;</span></span></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">#!/bin/bash</span>
<span class="line">echo $(date) &gt;&gt; /tmp/periodic.txt</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">64</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><code>periodic</code> 에서 cron 형태로 정의 가능</p></li><li><p><code>constraint</code>은 조건을 부여하는 옵션으로 attribute와 meta 정보를 활용 가능, 해당 예제에서는 hostname 기준으로 동작 타겟 호스트를 정의함</p><ul><li><p>attribute를 조건으로 주는 방법은 attribute값 앞에 <code>attr.</code> prefix를 추가</p></li><li><p>meta의 경우 meta로 선언된 키 앞에 <code>meta.</code> prefix를 추가</p></li><li><p>CLI로 확인하는 방법</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ nomad agent-info <span class="token operator">|</span> <span class="token function">grep</span> node_id</span>
<span class="line">  node_id <span class="token operator">=</span> ae3cf7ee-09e6-c158-d883-fe4e4f39eb2b</span>
<span class="line">$ nomad <span class="token function">node</span> status <span class="token parameter variable">-verbose</span> ae3cf7ee-09e6-c158-d883-fe4e4f39eb2b</span>
<span class="line">ID              <span class="token operator">=</span> ae3cf7ee-09e6-c158-d883-fe4e4f39eb2b</span>
<span class="line">Name            <span class="token operator">=</span> gs-C02CT3ZFML85</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line">Attributes</span>
<span class="line">cpu.arch                  <span class="token operator">=</span> amd64</span>
<span class="line">cpu.frequency             <span class="token operator">=</span> <span class="token number">2300</span></span>
<span class="line">cpu.modelname             <span class="token operator">=</span> Intel<span class="token punctuation">(</span>R<span class="token punctuation">)</span> Core<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> i7-1068NG7 CPU @ <span class="token number">2</span>.30GHz</span>
<span class="line">cpu.numcores              <span class="token operator">=</span> <span class="token number">8</span></span>
<span class="line">cpu.totalcompute          <span class="token operator">=</span> <span class="token number">18400</span></span>
<span class="line">driver.java               <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">driver.java.runtime       <span class="token operator">=</span> OpenJDK Runtime Environment Temurin-11.0.14.1+1 <span class="token punctuation">(</span>build <span class="token number">11.0</span>.14.1+1<span class="token punctuation">)</span></span>
<span class="line">driver.java.version       <span class="token operator">=</span> <span class="token number">11.0</span>.14.1</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line">Meta</span>
<span class="line">connect.gateway_image     <span class="token operator">=</span> envoyproxy/envoy:v<span class="token variable">\${NOMAD_envoy_version}</span></span>
<span class="line">connect.log_level         <span class="token operator">=</span> info</span>
<span class="line">connect.proxy_concurrency <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>UI로 확인하는 방법</p><ul><li><code>http://&lt;server_ip&gt;:4646</code> 에 접속</li><li>왼쪽 메뉴의 <code>CLUSTER/Clients</code> 선택</li><li>우측의 클라이언트 목록에서 원하는 클라이언트 선택</li></ul></li></ul></li></ul><h2 id="batch-prameterized" tabindex="-1"><a class="header-anchor" href="#batch-prameterized"><span>Batch - Prameterized</span></a></h2><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;param&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  </span>
<span class="line">  type        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span></span>
<span class="line"></span>
<span class="line">  parameterized <span class="token punctuation">{</span></span>
<span class="line">    payload <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;optional&quot;</span></span></span>
<span class="line">    meta_required <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;param&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  constraint <span class="token punctuation">{</span></span>
<span class="line">    attribute <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${attr.unique.hostname}&quot;</span></span></span>
<span class="line">    value     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;cn-client-1&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;batch&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;raw_exec&quot;</span></span></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">#!/bin/bash</span>
<span class="line">echo &#39;batch param {{ env &quot;NOMAD_META_PARAM&quot; }}&#39; &gt;&gt; /tmp/param.txt</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;run.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">64</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>parameterized</code> 항목에서 json형태의 payload, 또는 URL Param 형태를 입력 받아 동작 가능</li><li>요청시에만 동작</li></ul><h2 id="sysbatch" tabindex="-1"><a class="header-anchor" href="#sysbatch"><span>sysbatch</span></a></h2><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;install_docker&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">  </span>
<span class="line">  type        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;sysbatch&quot;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span> periodic <span class="token punctuation">{</span></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span>   cron             <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*/5 * * * * * *&quot;</span></span></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span>   prohibit_overlap <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span>   time_zone        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Asia/Seoul&quot;</span></span></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  constraint <span class="token punctuation">{</span></span>
<span class="line">    attribute <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${attr.os.name}&quot;</span></span></span>
<span class="line">    value     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;ubuntu&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;install&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;docker&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;raw_exec&quot;</span></span></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">#!/bin/bash</span>
<span class="line">apt-get update</span>
<span class="line">apt-get install -y apt-transport-https ca-certificates curl software-properties-common</span>
<span class="line">curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -</span>
<span class="line">add-apt-repository &quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable&quot;</span>
<span class="line">apt-get update</span>
<span class="line">apt-cache policy docker-ce</span>
<span class="line">apt-get install docker-ce -y</span>
<span class="line">systemctl enable docker</span>
<span class="line">systemctl start docker</span>
<span class="line"></span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;docker_install.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;docker_install.sh&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">64</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>docker를 ubuntu에 일괄 설치하는 예제</li><li>sysbatch는 조건에 맞는 모든 host node에서 실행</li></ul><h2 id="system" tabindex="-1"><a class="header-anchor" href="#system"><span>system</span></a></h2><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;system&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  type        <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;system&quot;</span></span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;cache&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">1</span></span>
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
<span class="line">        image <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;redis:6.2.6-alpine3.15&quot;</span></span></span>
<span class="line">        ports <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;db&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      resources <span class="token punctuation">{</span></span>
<span class="line">        cpu    <span class="token operator">=</span> <span class="token number">500</span></span>
<span class="line">        memory <span class="token operator">=</span> <span class="token number">512</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>system 타입은 모든 노드에서 실행하는 agent 같은 역할의 실행을 수행</li><li>예제에서는 docker 타입의 실행을 예로 <code>redis:6.2.6-alpine3.15</code>를 모든 노드에서 실행하도록 구성</li><li><code>group/network</code> 에서 사용할 network 조건을 정의 <ul><li>to : 대상의 포트 정보</li><li>static : 고정할 클라이언트에서의 포트 정보 (정의되어 있지 않으면 랜덤 부여)</li><li>사용할 포트 이름은 docker로 정의된 task의 config/ports 에서 맵핑하여 관리</li></ul></li></ul><h3 id="service" tabindex="-1"><a class="header-anchor" href="#service"><span>Service</span></a></h3><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">job <span class="token string-literal"><span class="token string">&quot;service&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  datacenters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;dc1&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span> spread <span class="token punctuation">{</span></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span>   attribute <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${node.datacenter}&quot;</span></span></span>
<span class="line">  <span class="token operator">/</span><span class="token operator">/</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line"></span>
<span class="line">    scaling <span class="token punctuation">{</span></span>
<span class="line">      enabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">      min <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">      max <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    network <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string-literal"><span class="token string">&quot;http&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        to <span class="token operator">=</span> <span class="token number">80</span></span>
<span class="line">        static <span class="token operator">=</span> <span class="token number">18080</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    service <span class="token punctuation">{</span></span>
<span class="line">      name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;nginx-backend&quot;</span></span></span>
<span class="line">      port <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;http&quot;</span></span></span>
<span class="line">      tags <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;prod&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      driver <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;docker&quot;</span></span></span>
<span class="line"></span>
<span class="line">      config <span class="token punctuation">{</span></span>
<span class="line">        image <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span></span>
<span class="line">        ports <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;http&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">        volumes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string-literal"><span class="token string">&quot;local/html:/usr/share/nginx/html&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      template <span class="token punctuation">{</span></span>
<span class="line">        data <span class="token operator">=</span> <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;</span><span class="token symbol">EOF</span></span><span class="token string"></span>
<span class="line">        &lt;h1&gt;Welcome to {{ env &quot;NOMAD_JOB_NAME&quot; }} Production {{ env &quot;NOMAD_HOST_PORT_http&quot; }}&lt;/h1&gt;</span>
<span class="line">        node_dc:       {{ env &quot;node.datacenter&quot; }}&lt;br&gt;</span>
<span class="line">        node_hostname: {{ env &quot;attr.unique.hostname&quot; }}&lt;br&gt;</span>
<span class="line">        node_cores:    {{ env &quot;attr.cpu.numcores&quot; }}&lt;br&gt;</span>
<span class="line">        os_name:       {{ env &quot;attr.os.name&quot; }}&lt;br&gt;</span>
<span class="line">        cpu_model:     {{ env &quot;attr.cpu.modelname&quot; }}&lt;br&gt;</span>
<span class="line">        </span><span class="token delimiter"><span class="token symbol">EOF</span></span></span></span>
<span class="line">        destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;local/html/index.html&quot;</span></span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Service 타입은 상시 실행된 서비스를 명시</li><li><code>count</code>가 2 이므로 해당 서비스는 2개를 띄우려고 시도</li><li><code>scaling</code> 정의가 있는 경우 UI/CLI/API 에서 scaling count값 지정 가능</li><li>포트에 <code>static</code> 명시가 되어있으므로 해당 서비스는 <code>18080</code>을 사용할 수 있는 count 만큼의 노드가 필요</li></ul>`,48),p=[i];function t(c,o){return n(),a("div",null,p)}const d=s(l,[["render",t],["__file","nomad-guide-basic.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/02-Config/nomad-guide-basic.html","title":"Nomad Guide - Basic","lang":"ko-KR","frontmatter":{"description":"Nomad 기본 구성 및 샘플 Job","tag":["Nomad","Sample"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/02-Config/nomad-guide-basic.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Nomad Guide - Basic"}],["meta",{"property":"og:description","content":"Nomad 기본 구성 및 샘플 Job"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nomad Guide - Basic\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Download","slug":"download","link":"#download","children":[]},{"level":2,"title":"on Linux","slug":"on-linux","link":"#on-linux","children":[{"level":3,"title":"구성 샘플","slug":"구성-샘플","link":"#구성-샘플","children":[]},{"level":3,"title":"Server Config","slug":"server-config","link":"#server-config","children":[]},{"level":3,"title":"Client Config","slug":"client-config","link":"#client-config","children":[]},{"level":3,"title":"Systemctl 서비스 등록","slug":"systemctl-서비스-등록","link":"#systemctl-서비스-등록","children":[]}]},{"level":2,"title":"실행 및 UI 확인","slug":"실행-및-ui-확인","link":"#실행-및-ui-확인","children":[]},{"level":2,"title":"Job 실행","slug":"job-실행","link":"#job-실행","children":[{"level":3,"title":"CLI","slug":"cli","link":"#cli","children":[]},{"level":3,"title":"UI","slug":"ui","link":"#ui","children":[]}]},{"level":2,"title":"Job Sample","slug":"job-sample","link":"#job-sample","children":[{"level":3,"title":"batch - basic","slug":"batch-basic","link":"#batch-basic","children":[]},{"level":3,"title":"batch - periodic","slug":"batch-periodic","link":"#batch-periodic","children":[]}]},{"level":2,"title":"Batch - Prameterized","slug":"batch-prameterized","link":"#batch-prameterized","children":[]},{"level":2,"title":"sysbatch","slug":"sysbatch","link":"#sysbatch","children":[]},{"level":2,"title":"system","slug":"system","link":"#system","children":[{"level":3,"title":"Service","slug":"service","link":"#service","children":[]}]}],"git":{"createdTime":1652660873000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":3},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":13.72,"words":823},"filePathRelative":"04-HashiCorp/07-Nomad/02-Config/nomad-guide-basic.md","localizedDate":"2022년 5월 16일","excerpt":"\\n<h2>Download</h2>\\n<ul>\\n<li>Release link : <a href=\\"https://releases.hashicorp.com/nomad\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://releases.hashicorp.com/nomad</a></li>\\n<li>Version : 1.3.x</li>\\n<li>Platform 선택\\n<ul>\\n<li>darwin(= MAC)</li>\\n<li>Linux</li>\\n<li>Windows</li>\\n</ul>\\n</li>\\n</ul>\\n<h2>on Linux</h2>"}');export{d as comp,v as data};
