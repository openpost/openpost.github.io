import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as c,c as r,b as u,w as a,h as p,g as s,a as n}from"./app-DhMJQ1_3.js";const d="/assets/nomad_ui_jenkins_alloc-B5xgPNXE.png",m="/assets/nomad_ui_jenkins_exec--fMlpeAf.png",k={},v=p(`<h1 id="jenkins-java-driver-on-nomad" tabindex="-1"><a class="header-anchor" href="#jenkins-java-driver-on-nomad"><span>Jenkins(Java Driver) on Nomad</span></a></h1><blockquote><p>Nomad</p><ul><li>Java Driver : <a href="https://developer.hashicorp.com/nomad/docs/drivers/java" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/nomad/docs/drivers/java</a></li><li>Schecuduler Config : <a href="https://developer.hashicorp.com/nomad/api-docs/operator/scheduler" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/nomad/api-docs/operator/scheduler</a></li></ul></blockquote><h2 id="_1-jenkins의-기본-실행-방식" tabindex="-1"><a class="header-anchor" href="#_1-jenkins의-기본-실행-방식"><span>1. Jenkins의 기본 실행 방식</span></a></h2><p>Jenkins의 공식 설치 안내에서 처럼 Java를 실행시킬 수 있는 환경에서 <code>war</code> 형태의 자바 웹어플리케이션 압축 파일을 실행하는 형태, 컨테이너, OS별 지원되는 패키지 형태로 실행된다.</p><ul><li>공식 설치 안내 : <a href="https://www.jenkins.io/doc/book/installing/" target="_blank" rel="noopener noreferrer">https://www.jenkins.io/doc/book/installing/</a></li></ul><p>각 설치 형태의 특징은 다음과 같다.</p><table><thead><tr><th>형태</th><th>설명</th><th>특징</th></tr></thead><tbody><tr><td>war</td><td>JRE 또는 JDK가 설치되어있는 환경에서 실행가능</td><td>서버 재부팅, 장애 시 수동으로 실행 필요</td></tr><tr><td>Container</td><td>컨테이너 런타임(e.g. docker, containerd ... )에서 실행</td><td>컨테이너 관리 및 영구저장소 관리 필요</td></tr><tr><td>Package</td><td>각 OS 마다 제공되는 패키지 관리자에서 관리</td><td>필요한 패키지 자동설치 및 재부팅시 재시작 가능하나 장애시 수동 실행 필요</td></tr></tbody></table><h2 id="_2-nomad에서의-java-애플리케이션-실행의-의미" tabindex="-1"><a class="header-anchor" href="#_2-nomad에서의-java-애플리케이션-실행의-의미"><span>2. Nomad에서의 Java 애플리케이션 실행의 의미</span></a></h2><p>Nomad는 애플리케이션 실행을 오케스트레이션 해주는 역할로, Java 애플리케이션의 여러 실행 형태에 장점만을 취합하여 실행 환경을 제공할 수 있다.</p><ul><li>운영에 익숙한 Host OS에서 실행</li><li>chroot, cgroups 등의 컨테이너 특징으로 격리 기능 제공</li><li>프로세스 장애 시 재시작</li><li>영구저장소 마운트 (Host 디렉토리와 CSI 둘 모두 지원)</li><li>Java 실행을 선언적으로 구성</li><li>Java의 범위정의되는 Memory(Xms, Xmx)에 맞춰 리소스 격리</li></ul><h2 id="_3-nomad-구성-요구사항" tabindex="-1"><a class="header-anchor" href="#_3-nomad-구성-요구사항"><span>3. Nomad 구성 요구사항</span></a></h2><p>Nomoad 에서는 Jenkins 실행을 위해 다음 조건이 필요하다.</p><h3 id="_3-1-nomad-client" tabindex="-1"><a class="header-anchor" href="#_3-1-nomad-client"><span>3.1 Nomad Client</span></a></h3><ul><li>Host Volume을 위한 디렉토리 생성<div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 예시</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/nomad/volume/jenkins</span>
<span class="line"></span></code></pre></div></li><li>Linux/macOS의 경우 Java Driver 실행시 계정을 <code>nobody</code>로 부여하므로 <code>nobody</code>계정에 권한으로 실행 필요<div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 예시</span></span>
<span class="line"><span class="token comment"># macOS인 경우</span></span>
<span class="line"><span class="token function">chown</span> <span class="token parameter variable">-R</span> nobody:nobody /opt/nomad/volume/jenkins</span>
<span class="line"><span class="token comment"># ubuntu인 경우</span></span>
<span class="line"><span class="token function">chown</span> <span class="token parameter variable">-R</span> nobody:nogroup /opt/nomad/volume/jenkins</span>
<span class="line"></span></code></pre></div></li><li>Client 구성 피알의 <code>client</code> 블록에 Host Volume을 지정<div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">client</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token comment"># 생략</span></span>
<span class="line">  host_volume <span class="token string">&quot;jenkins&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">path</span>      <span class="token punctuation">=</span> <span class="token string">&quot;/opt/nomad/volume/jenkins&quot;</span></span>
<span class="line">    <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div></li></ul><h3 id="_3-2-nomad-scheduler" tabindex="-1"><a class="header-anchor" href="#_3-2-nomad-scheduler"><span>3.2 Nomad Scheduler</span></a></h3><p><a href="https://www.hashicorp.com/blog/announcing-general-availability-of-hashicorp-nomad-1-1" target="_blank" rel="noopener noreferrer">Nomad 1.1</a>부터 리소스에 대한 유연한 설정 기능이 추가되었다. 그 중 메모리 할당 추가 기능인 <a href="https://www.hashicorp.com/blog/managing-resources-for-workloads-with-nomad-1-1" target="_blank" rel="noopener noreferrer">Memory Oversubscription</a>이 추가되었고, Java 애플리케이션이 갖는 특징인 JVM 메모리의 범위 할당과도 연계되는 설정 방식이다. JVM 64bit 부터는 기본적으로 소모하는 메모리가 크고, 한번 증가한 메모리는 장기간 유지되기 때문에 메모리에 대한 유연한 설정은 중요하다.<br><img src="https://www.datocms-assets.com/2885/1620146573-oversubscription.png?fit=max&amp;fm=webp&amp;q=80&amp;w=2500" alt="" loading="lazy"></p><p>특히, Nomad에서 리소스를 격리하여 Java 드라이버에 제공되므로 지정된 메모리보다 초과 사용하는 경우 격리된 리소스로 인해 <code>Error code 143 Signal 9</code> (Out Of Memory 로 인한 프로세스 강제종료)형상이 발생할 수 있다.</p><p><code>Oversubscription</code> 기능은 고급 기능으로 구성설정에서 지정할 수는 없고 CLI/API/Terraform을 사용하여 설정을 변경해야 한다. (<a href="https://developer.hashicorp.com/nomad/tutorials/advanced-scheduling/memory-oversubscription?in=nomad%2Fadvanced-scheduling" target="_blank" rel="noopener noreferrer">설명 링크</a>)</p>`,18),h=n("p",null,[s("링크 : "),n("a",{href:"https://developer.hashicorp.com/nomad/docs/commands/operator/scheduler/set-config",target:"_blank",rel:"noopener noreferrer"},"https://developer.hashicorp.com/nomad/docs/commands/operator/scheduler/set-config")],-1),b=n("div",{class:"language-bash","data-highlighter":"prismjs","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"line"},[s("$ nomad operator scheduler set-config -memory-oversubscription"),n("span",{class:"token operator"},"="),s("true")]),s(`
`),n("span",{class:"line"})])])],-1),g=n("p",null,[s("링크 : "),n("a",{href:"https://developer.hashicorp.com/nomad/tutorials/advanced-scheduling/memory-oversubscription?in=nomad%2Fadvanced-scheduling",target:"_blank",rel:"noopener noreferrer"},"https://developer.hashicorp.com/nomad/tutorials/advanced-scheduling/memory-oversubscription?in=nomad%2Fadvanced-scheduling")],-1),_=n("div",{class:"language-bash","data-highlighter":"prismjs","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"line"},[s("$ "),n("span",{class:"token function"},"curl"),s(),n("span",{class:"token parameter variable"},"-s"),s(),n("span",{class:"token variable"},"$NOMAD_ADDR"),s("/v1/operator/scheduler/configuration "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token punctuation"},"\\")]),s(`
`),n("span",{class:"line"},[s("jq "),n("span",{class:"token string"},"'.SchedulerConfig | .MemoryOversubscriptionEnabled=true'"),s(),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token punctuation"},"\\")]),s(`
`),n("span",{class:"line"},[n("span",{class:"token function"},"curl"),s(),n("span",{class:"token parameter variable"},"-X"),s(" PUT "),n("span",{class:"token variable"},"$NOMAD_ADDR"),s("/v1/operator/scheduler/configuration "),n("span",{class:"token parameter variable"},"-d"),s(" @-")]),s(`
`),n("span",{class:"line"})])])],-1),y=n("p",null,[s("링크 : "),n("a",{href:"https://registry.terraform.io/providers/hashicorp/nomad/latest/docs/resources/scheduler_config",target:"_blank",rel:"noopener noreferrer"},"https://registry.terraform.io/providers/hashicorp/nomad/latest/docs/resources/scheduler_config")],-1),f=n("div",{class:"language-hcl line-numbers-mode","data-highlighter":"prismjs","data-ext":"hcl","data-title":"hcl"},[n("pre",{class:"language-hcl"},[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},[s("resource "),n("span",{class:"token type variable"},'"nomad_scheduler_config"')]),s(),n("span",{class:"token string"},'"config"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"scheduler_algorithm"),s("             "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"binpack"')]),s(`
`),n("span",{class:"line highlighted"},[s("  "),n("span",{class:"token property"},"memory_oversubscription_enabled"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"preemption_config"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token property"},"system_scheduler_enabled"),s("   "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token property"},"batch_scheduler_enabled"),s("    "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token property"},"service_scheduler_enabled"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token property"},"sysbatch_scheduler_enabled"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),q=p(`<h2 id="_4-job-sample" tabindex="-1"><a class="header-anchor" href="#_4-job-sample"><span>4. Job Sample</span></a></h2><ul><li>resources <ul><li>memory_max : 유동적 메모리 할당</li><li>network : Jenkins에서 사용할 포트 지정</li></ul></li><li>env : Jenkins Home 디렉토리 위한 환경 변수 <code>JENKINS_HOME</code> 선언</li><li>config <ul><li>jar_path : <code>artifact</code>로 받은 war파일 경로</li><li>jvm_options : jvm 실행 옵션</li><li>args : war 실행 문서에서 지정하는 <code>--httpPort</code>는 args 항목이고 jvm 옵션이 아님에 주의</li></ul></li><li>volume_mount : Jenkins Home 디렉토리로 Host Volume으로 지정한 영구적 볼륨 할당</li><li>artifact : war 파일 다운로드 경로</li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;namespace&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;default&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;jenkins_version&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;2.361.3&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;jenkins&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;home&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">namespace</span> <span class="token punctuation">=</span> var.namespace</span>
<span class="line"></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">constraint</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">attribute</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>meta<span class="token punctuation">.</span>type<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">    <span class="token property">value</span>     <span class="token punctuation">=</span> <span class="token string">&quot;vraptor&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">update</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">healthy_deadline</span> <span class="token punctuation">=</span> <span class="token string">&quot;10m&quot;</span></span>
<span class="line">    <span class="token property">progress_deadline</span> <span class="token punctuation">=</span> <span class="token string">&quot;20m&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;jenkins&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">    volume <span class="token string">&quot;jenkins&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">type</span>      <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">      <span class="token property">source</span>    <span class="token punctuation">=</span> <span class="token string">&quot;jenkins&quot;</span></span>
<span class="line">      <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string">&quot;jenkins_http&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// to = 8080</span></span>
<span class="line">        <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">8888</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    task <span class="token string">&quot;war&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;java&quot;</span></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">1000</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">1024</span></span>
<span class="line">        <span class="token property">memory_max</span> <span class="token punctuation">=</span> <span class="token number">2048</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">JENKINS_HOME</span> <span class="token punctuation">=</span> <span class="token string">&quot;/jenkins_home&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">jar_path</span>    <span class="token punctuation">=</span> <span class="token string">&quot;local/jenkins.war&quot;</span></span>
<span class="line">        <span class="token property">jvm_options</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;-Xms1024m&quot;</span>, <span class="token string">&quot;-Xmx2048m&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;--httpPort=<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_PORT_jenkins_http<span class="token punctuation">}</span></span>&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">volume_mount</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">volume</span>      <span class="token punctuation">=</span> <span class="token string">&quot;jenkins&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/jenkins_home&quot;</span></span>
<span class="line">        <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;jenkins&quot;</span></span>
<span class="line">        <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;cicd&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">provider</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;jenkins_http&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;jenkins port&quot;</span></span>
<span class="line">          <span class="token property">type</span>  <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">logs</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">max_files</span>     <span class="token punctuation">=</span> <span class="token number">10</span></span>
<span class="line">        <span class="token property">max_file_size</span> <span class="token punctuation">=</span> <span class="token number">10</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://get.jenkins.io/war-stable/<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">var</span><span class="token punctuation">.</span><span class="token type variable">jenkins_version</span><span class="token punctuation">}</span></span>/jenkins.war&quot;</span></span>
<span class="line">        <span class="token keyword">options</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">checksum</span> <span class="token punctuation">=</span> <span class="token string">&quot;sha256:f39cb8d09fd17c72dc096511ce50f245fc3004d1022aaaf60421a536f740c9b9&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// destination = &quot;local&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="hint-container tip"><p class="hint-container-title">실행 후 Admin Token</p><p>Jenkins Home 디렉토리로 지정한 디렉토리에 관련 파일이 생성되며, 실제 호스트의 디렉토리에서 접근하는 것도 가능하나 Nomad의 <code>Exec</code>에서 접근하는 것도 가능하다<br><img src="'+m+'" alt="" loading="lazy"></p></div>',5);function j(w,J){const l=i("Tabs");return c(),r("div",null,[v,u(l,{id:"165",data:[{id:"CLI"},{id:"curl"},{id:"Terraform"}]},{title0:a(({value:e,isActive:t})=>[s("CLI")]),title1:a(({value:e,isActive:t})=>[s("curl")]),title2:a(({value:e,isActive:t})=>[s("Terraform")]),tab0:a(({value:e,isActive:t})=>[h,b]),tab1:a(({value:e,isActive:t})=>[g,_]),tab2:a(({value:e,isActive:t})=>[y,f]),_:1}),q])}const S=o(k,[["render",j],["__file","jenkins_java_driver.html.vue"]]),A=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/jenkins_java_driver.html","title":"Jenkins(Java Driver) on Nomad","lang":"ko-KR","frontmatter":{"description":"Jenkins WAR 파일로 실행하기","tag":["Nomad","Sample","Job","Jenkins"],"author":"GS","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/jenkins_java_driver.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Jenkins(Java Driver) on Nomad"}],["meta",{"property":"og:description","content":"Jenkins WAR 파일로 실행하기"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.datocms-assets.com/2885/1620146573-oversubscription.png?fit=max&fm=webp&q=80&w=2500"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:55:52.000Z"}],["meta",{"property":"article:author","content":"GS"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:tag","content":"Jenkins"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:55:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jenkins(Java Driver) on Nomad\\",\\"image\\":[\\"https://www.datocms-assets.com/2885/1620146573-oversubscription.png?fit=max&fm=webp&q=80&w=2500\\"],\\"dateModified\\":\\"2024-03-08T06:55:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GS\\"}]}"]]},"headers":[{"level":2,"title":"1. Jenkins의 기본 실행 방식","slug":"_1-jenkins의-기본-실행-방식","link":"#_1-jenkins의-기본-실행-방식","children":[]},{"level":2,"title":"2. Nomad에서의 Java 애플리케이션 실행의 의미","slug":"_2-nomad에서의-java-애플리케이션-실행의-의미","link":"#_2-nomad에서의-java-애플리케이션-실행의-의미","children":[]},{"level":2,"title":"3. Nomad 구성 요구사항","slug":"_3-nomad-구성-요구사항","link":"#_3-nomad-구성-요구사항","children":[{"level":3,"title":"3.1 Nomad Client","slug":"_3-1-nomad-client","link":"#_3-1-nomad-client","children":[]},{"level":3,"title":"3.2 Nomad Scheduler","slug":"_3-2-nomad-scheduler","link":"#_3-2-nomad-scheduler","children":[]}]},{"level":2,"title":"4. Job Sample","slug":"_4-job-sample","link":"#_4-job-sample","children":[]}],"git":{"createdTime":1667735440000,"updatedTime":1709880952000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":3},{"name":"swbs90","email":"36329083+swbs90@users.noreply.github.com","commits":1},{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":6.48,"words":389},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/jenkins_java_driver.md","localizedDate":"2022년 11월 6일","excerpt":"\\n<blockquote>\\n<p>Nomad</p>\\n<ul>\\n<li>Java Driver : <a href=\\"https://developer.hashicorp.com/nomad/docs/drivers/java\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://developer.hashicorp.com/nomad/docs/drivers/java</a></li>\\n<li>Schecuduler Config : <a href=\\"https://developer.hashicorp.com/nomad/api-docs/operator/scheduler\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://developer.hashicorp.com/nomad/api-docs/operator/scheduler</a></li>\\n</ul>\\n</blockquote>","copyright":{"author":"GS"}}');export{S as comp,A as data};