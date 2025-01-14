import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const p="/assets/nomad-pack-Bg85ANmg.png",l="/assets/vuepress-CqtM6Gs1.png",t={},i=e(`<h1 id="nomad-pack-custom-registry" tabindex="-1"><a class="header-anchor" href="#nomad-pack-custom-registry"><span>nomad-pack custom registry</span></a></h1><ul><li>nomad job파일을 템플릿처럼 다룰 수 있게 해주는 고마운 기능 <ul><li>nomad-pack custom 메뉴얼 주소 및 커뮤니티 registry <ul><li>nomad-pack: <a href="https://github.com/hashicorp/nomad-pack/blob/main/docs/writing-packs.md" target="_blank" rel="noopener noreferrer">https://github.com/hashicorp/nomad-pack/blob/main/docs/writing-packs.md</a></li><li>커뮤니티 registry : <a href="https://github.com/hashicorp/nomad-pack-community-registry" target="_blank" rel="noopener noreferrer">https://github.com/hashicorp/nomad-pack-community-registry</a></li></ul></li></ul></li><li>해당 예제는 Vue.js의 vuepress기반의 컨테이너 <ul><li>참조링크 <ul><li>gitlab: <a href="https://gitlab.com/swbs9000/vuepress" target="_blank" rel="noopener noreferrer">https://gitlab.com/swbs9000/vuepress</a></li><li>docker: <a href="https://hub.docker.com/repository/docker/swbs90/vuepress" target="_blank" rel="noopener noreferrer">https://hub.docker.com/repository/docker/swbs90/vuepress</a> CLI: docker push swbs90/vuepress:0.0.3</li><li>vuepress: <a href="https://github.com/docmoa/docs" target="_blank" rel="noopener noreferrer">https://github.com/docmoa/docs</a></li></ul></li></ul></li></ul><h2 id="docker-image-build" tabindex="-1"><a class="header-anchor" href="#docker-image-build"><span>Docker image build</span></a></h2><ul><li>다같이 사용하던 docmoa를 build 해보기로함</li><li>core.js의 의존성 패키지 중에 python2.7, make, gcc, g++를 요구하는 이상한 패키지가 있어서 image 크기가 급증함... <ul><li>추후 CI/CD 재구성 시 vue.js는 어떤식으로 처리해야할 지 고민해봐야 할 듯</li></ul></li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment"># Docker file</span></span>
<span class="line">FROM blasteh/vuepress:<span class="token number">8.3</span> <span class="token comment">#기존에 돌아 다니는 vuepress의 npm 버전이 너무 낮아 하나 받아서 버전업함</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#특정 패키지 빌드 시 아래와 같은패캐지들을 필요로 함</span></span>
<span class="line">RUN apk add --no-cache python2</span>
<span class="line">RUN apk add --no-cache make</span>
<span class="line">RUN apk add --no-cache gcc</span>
<span class="line">RUN apk add --no-cache g++</span>
<span class="line"></span>
<span class="line">RUN mkdir /etc/bin</span>
<span class="line"></span>
<span class="line">RUN cp /usr/bin/python2 /etc/bin/python2.<span class="token number">7</span></span>
<span class="line">RUN cp /usr/bin/make    /etc/bin/make</span>
<span class="line">RUN cp /usr/bin/gcc     /etc/bin/gcc</span>
<span class="line">RUN cp /usr/bin/g++     /etc/bin/g++</span>
<span class="line"></span>
<span class="line">RUN npm config set python /etc/bin/python2.<span class="token number">7</span></span>
<span class="line">RUN npm config set make   /etc/bin/make</span>
<span class="line">RUN npm config set gcc    /etc/bin/gcc</span>
<span class="line">RUN npm config set g++    /etc/bin/g++</span>
<span class="line"></span>
<span class="line">ADD docs /root/src/docs</span>
<span class="line"></span>
<span class="line">WORKDIR /root/src/docs</span>
<span class="line">RUN npm install</span>
<span class="line"></span>
<span class="line">expose <span class="token number">8000</span></span>
<span class="line"></span>
<span class="line">ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;/usr/local/bin/npm&quot;</span>, <span class="token string">&quot;run&quot;</span>, <span class="token string">&quot;dev&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vcs-구성" tabindex="-1"><a class="header-anchor" href="#vcs-구성"><span>vcs 구성</span></a></h2><ul><li>web gitlab을 사용함</li><li>private로 만들면 권한문제 해결이 안됨. 그래서 일단 public으로 구성 <ul><li>다른 옵션은 괜찮으나, metadata.hcl의 pack -&gt; url은 public github로 하지않으면 에러발생 <ul><li>gitlab으로 설정 시 출력되는 error log가 명확하지 않아, github로 넣어둠</li></ul></li><li>참고: <a href="https://gitlab.com/swbs9000/vuepress" target="_blank" rel="noopener noreferrer">https://gitlab.com/swbs9000/vuepress</a></li></ul></li></ul><h3 id="디렉토리-구조" tabindex="-1"><a class="header-anchor" href="#디렉토리-구조"><span>디렉토리 구조</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">pack/vuepres</span>
<span class="line">├── metadata.hcl </span>
<span class="line">├── outputs.tpl</span>
<span class="line">├── templates</span>
<span class="line">│   └── vuepress.nomad.tpl</span>
<span class="line">└── variables.hcl</span>
<span class="line"></span></code></pre></div><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#metadata.hcl</span></span>
<span class="line"><span class="token keyword">app</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://gitlab.com/swbs9000/nomad-pack&quot;</span></span>
<span class="line">  <span class="token property">author</span> <span class="token punctuation">=</span> <span class="token string">&quot;unghee&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">pack</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;vuepress&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;vuepress test.&quot;</span></span>
<span class="line">  <span class="token property">url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/swbs90/vuepress&quot;</span></span>
<span class="line">  <span class="token property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.0.1&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#variables.hcl</span></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;job_name&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;The name to use as the job name which overrides using the pack name&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token comment">// If &quot;&quot;, the pack name will be used</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;datacenters&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;A list of datacenters in the region which are eligible for task placement&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> list(string)</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;region&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;The region where the job should be placed&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">&quot;global&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;consul_service_name&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;The consul service you wish to load balance&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">&quot;webapp&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;version_tag&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;The docker image version. For options, see https://hub.docker.com/repository/docker/swbs90/vuepress&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">&quot;latest&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#variable &quot;http_port&quot; {</span></span>
<span class="line"><span class="token comment">#  description = &quot;The Nomad client port that routes to the Vuepress. This port will be where you visit your load balanced application&quot;</span></span>
<span class="line"><span class="token comment">#  type        = number</span></span>
<span class="line"><span class="token comment">#  default     = 8000</span></span>
<span class="line"><span class="token comment">#}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;resources&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;The resource to assign to the Vuepress system task that runs on every client&quot;</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> object(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">cpu</span>    <span class="token punctuation">=</span> number</span>
<span class="line">    <span class="token property">memory</span> <span class="token punctuation">=</span> number</span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">800</span>,</span>
<span class="line">    <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">1200</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#vuepress.nomad.tpl</span></span>
<span class="line">job <span class="token string">&quot;[[ .vuepress.job_name ]]&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">region</span>      <span class="token punctuation">=</span> <span class="token string">&quot;[[ .vuepress.region ]]&quot;</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> .vuepress.datacenters | toPrettyJson <span class="token punctuation">]</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">// must have linux for network mode</span></span>
<span class="line">  <span class="token keyword">constraint</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">attribute</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>attr<span class="token punctuation">.</span>kernel<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">    <span class="token property">value</span>     <span class="token punctuation">=</span> <span class="token string">&quot;linux&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;vuepress&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">to</span> <span class="token punctuation">=</span> <span class="token number">8000</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">provider</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad&quot;</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;[[ .vuepress.consul_service_name ]]&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;vuepress&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;swbs90/vuepress:[[ .vuepress.version_tag ]]&quot;</span></span>
<span class="line">        <span class="token property">ports</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> .vuepress.resources.cpu <span class="token punctuation">]</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> .vuepress.resources.memory <span class="token punctuation">]</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nomad-pack-registry-등록-및-실행" tabindex="-1"><a class="header-anchor" href="#nomad-pack-registry-등록-및-실행"><span>nomad-pack registry 등록 및 실행</span></a></h2><ul><li>이제 다 끝났다. 등록하고 실행하면 된다.</li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment">#커스텀 registry 등록하기</span></span>
<span class="line">nomad-pack registry add vuepress https:<span class="token comment">//gitlab.com/swbs9000/vuepress.git</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#배포하기</span></span>
<span class="line">nomad-pack plan vuepress <span class="token property">--var</span><span class="token punctuation">=</span><span class="token string">&quot;job_name=vuepress&quot;</span> <span class="token property">--var</span><span class="token punctuation">=</span><span class="token string">&quot;consul_service_name=vuepress&quot;</span> <span class="token property">--var</span><span class="token punctuation">=</span><span class="token string">&quot;version_tag=0.0.3&quot;</span> <span class="token property">--registry</span><span class="token punctuation">=</span>vuepress</span>
<span class="line">+/- Job: <span class="token string">&quot;vuepress&quot;</span></span>
<span class="line">- Meta<span class="token punctuation">[</span>pack.deployment_name<span class="token punctuation">]</span>: <span class="token string">&quot;vuepress@latest&quot;</span></span>
<span class="line">- Meta<span class="token punctuation">[</span>pack.job<span class="token punctuation">]</span>:             <span class="token string">&quot;vuepress&quot;</span></span>
<span class="line">- Meta<span class="token punctuation">[</span>pack.name<span class="token punctuation">]</span>:            <span class="token string">&quot;vuepress&quot;</span></span>
<span class="line">- Meta<span class="token punctuation">[</span>pack.path<span class="token punctuation">]</span>:            <span class="token string">&quot;/root/.nomad/packs/vuepress/vuepress@latest&quot;</span></span>
<span class="line">- Meta<span class="token punctuation">[</span>pack.registry<span class="token punctuation">]</span>:        <span class="token string">&quot;vuepress&quot;</span></span>
<span class="line">- Meta<span class="token punctuation">[</span>pack.version<span class="token punctuation">]</span>:         <span class="token string">&quot;latest&quot;</span></span>
<span class="line">Task Group: <span class="token string">&quot;vuepress&quot;</span> (<span class="token number">1</span> create/destroy update)</span>
<span class="line">    Task: <span class="token string">&quot;vuepress&quot;</span></span>
<span class="line"></span>
<span class="line">» Scheduler dry-run:</span>
<span class="line">- All tasks successfully allocated.</span>
<span class="line">Plan succeeded</span>
<span class="line"></span>
<span class="line">nomad-pack run vuepress <span class="token property">--var</span><span class="token punctuation">=</span><span class="token string">&quot;job_name=vuepress&quot;</span> <span class="token property">--var</span><span class="token punctuation">=</span><span class="token string">&quot;consul_service_name=vuepress&quot;</span> <span class="token property">--var</span><span class="token punctuation">=</span><span class="token string">&quot;version_tag=0.0.3&quot;</span> <span class="token property">--registry</span><span class="token punctuation">=</span>vuepress</span>
<span class="line">  Evaluation ID: d38e6717-cd12-<span class="token number">6</span>ef5-<span class="token number">62</span>d4-<span class="token number">9</span>b5da1755020</span>
<span class="line">  Job &#39;vuepress&#39; in pack deployment &#39;vuepress@latest&#39; registered successfully</span>
<span class="line">Pack successfully deployed. Use vuepress@latest with <span class="token property">--ref</span><span class="token punctuation">=</span>latest to manage this this deployed instance with plan, stop, destroy, or info</span>
<span class="line"></span>
<span class="line">Vuepress(my docma) successfully deployed.</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="작동-확인" tabindex="-1"><a class="header-anchor" href="#작동-확인"><span>작동 확인</span></a></h2><ul><li>배포가 잘 되었으면, ip:port가 생성되고 그 정보로 우리가 잘 아는 페이지를 볼 수 있다. <ul><li>배포 확인 및 ip:port 확인<br><img src="`+p+'" alt="" loading="lazy"></li><li>접속 테스트 <ul><li>아주 잘 보이고 잘 작동함<br><img src="'+l+'" alt="" loading="lazy"></li></ul></li></ul></li></ul>',17),c=[i];function o(r,u){return n(),a("div",null,c)}const v=s(t,[["render",o],["__file","nomad-pack.html.vue"]]),k=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/nomad-pack.html","title":"nomad-pack custom registry","lang":"ko-KR","frontmatter":{"description":"Nomad Sample","tag":["Nomad","Sample","Job","nomad-pack","vuepress"],"author":"Ung","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/nomad-pack.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"nomad-pack custom registry"}],["meta",{"property":"og:description","content":"Nomad Sample"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:56:11.000Z"}],["meta",{"property":"article:author","content":"Ung"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:tag","content":"nomad-pack"}],["meta",{"property":"article:tag","content":"vuepress"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:56:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nomad-pack custom registry\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T06:56:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ung\\"}]}"]]},"headers":[{"level":2,"title":"Docker image build","slug":"docker-image-build","link":"#docker-image-build","children":[]},{"level":2,"title":"vcs 구성","slug":"vcs-구성","link":"#vcs-구성","children":[{"level":3,"title":"디렉토리 구조","slug":"디렉토리-구조","link":"#디렉토리-구조","children":[]}]},{"level":2,"title":"nomad-pack registry 등록 및 실행","slug":"nomad-pack-registry-등록-및-실행","link":"#nomad-pack-registry-등록-및-실행","children":[]},{"level":2,"title":"작동 확인","slug":"작동-확인","link":"#작동-확인","children":[]}],"git":{"createdTime":1639580700000,"updatedTime":1709880971000,"contributors":[{"name":"ung","email":"swbs90@naver.com","commits":2},{"name":"ung","email":"ung@mz.co.kr","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":8.85,"words":531},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/nomad-pack.md","localizedDate":"2021년 12월 16일","excerpt":"\\n<ul>\\n<li>nomad job파일을 템플릿처럼 다룰 수 있게 해주는 고마운 기능\\n<ul>\\n<li>nomad-pack custom 메뉴얼 주소 및 커뮤니티 registry\\n<ul>\\n<li>nomad-pack: <a href=\\"https://github.com/hashicorp/nomad-pack/blob/main/docs/writing-packs.md\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/hashicorp/nomad-pack/blob/main/docs/writing-packs.md</a></li>\\n<li>커뮤니티 registry : <a href=\\"https://github.com/hashicorp/nomad-pack-community-registry\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/hashicorp/nomad-pack-community-registry</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li>해당 예제는 Vue.js의 vuepress기반의 컨테이너\\n<ul>\\n<li>참조링크\\n<ul>\\n<li>gitlab: <a href=\\"https://gitlab.com/swbs9000/vuepress\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://gitlab.com/swbs9000/vuepress</a></li>\\n<li>docker: <a href=\\"https://hub.docker.com/repository/docker/swbs90/vuepress\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://hub.docker.com/repository/docker/swbs90/vuepress</a> CLI: docker push swbs90/vuepress:0.0.3</li>\\n<li>vuepress: <a href=\\"https://github.com/docmoa/docs\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/docmoa/docs</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>","copyright":{"author":"Ung"}}');export{v as comp,k as data};
