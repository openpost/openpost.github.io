import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as p}from"./app-DhMJQ1_3.js";const e={},l=p(`<h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis"><span>redis</span></a></h1><ul><li>추가내용: redis는 data dir, cluster info dir(클러스터 시) 이 두개의 dir가 필요하여 volume을 추가로 붙여줘야한다. <ul><li>data dir을 변경이 번거로움(docker build를 다시 해야함) 그래서 클러스터 시에는 docker build, nomad volume으로 나눔과 같은 방법이 있음</li><li>cluster-enabled : 클러스터로 사용합니다. (cluster volume으로 빼둬야됨)</li><li>cluster-config-file : 노드별로 클러스터 노드 정보를 conf 파일에 저장합니다.</li><li>cluster-node-timeout : 노드간 통신이 되지 않아 timeout 되는 시간을 설정합니다.</li></ul></li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;redis-cluster&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;redis&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    volume <span class="token string">&quot;redis-data&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">type</span>      <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">      <span class="token property">source</span>    <span class="token punctuation">=</span> <span class="token string">&quot;redis-data&quot;</span></span>
<span class="line">      <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    volume <span class="token string">&quot;redis-cluster&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">type</span>      <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">      <span class="token property">source</span>    <span class="token punctuation">=</span> <span class="token string">&quot;redis-cluster&quot;</span></span>
<span class="line">      <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      </span>
<span class="line">      port <span class="token string">&quot;master&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">to</span>     <span class="token punctuation">=</span> <span class="token number">6379</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      port <span class="token string">&quot;slave&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">to</span>     <span class="token punctuation">=</span> <span class="token number">6380</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;master-redis&quot;</span></span>
<span class="line">      <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;master-redis&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token property">port</span>     <span class="token punctuation">=</span> <span class="token string">&quot;master&quot;</span></span>
<span class="line">      <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">port</span>     <span class="token punctuation">=</span> <span class="token string">&quot;master&quot;</span></span>
<span class="line">        <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">        <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">        <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;slave-redis&quot;</span></span>
<span class="line">      <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;slave-redis&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token property">port</span>     <span class="token punctuation">=</span> <span class="token string">&quot;slave&quot;</span></span>
<span class="line">      <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">port</span>     <span class="token punctuation">=</span> <span class="token string">&quot;slave&quot;</span></span>
<span class="line">        <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">        <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">        <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;redis-master&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">volume_mount</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">volume</span>      <span class="token punctuation">=</span> <span class="token string">&quot;redis-data&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/data&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">volume_mount</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">volume</span>      <span class="token punctuation">=</span> <span class="token string">&quot;redis-cluster&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/master&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">network_mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;redis:5.0.5-buster&quot;</span></span>
<span class="line">        <span class="token property">ports</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;master&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;redis-server&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_TASK_DIR<span class="token punctuation">}</span></span>/redis.conf&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">port {{ env &quot;NOMAD_PORT_master&quot; }} </span>
<span class="line">bind {{ env &quot;NOMAD_IP_master&quot; }} </span>
<span class="line">#bind 127.0.0.1 ::1</span>
<span class="line">cluster-enabled yes</span>
<span class="line">cluster-config-file /master/nodes.conf</span>
<span class="line">cluster-node-timeout 3000</span>
<span class="line">appendonly yes</span>
<span class="line"></span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">destination</span>   <span class="token punctuation">=</span> <span class="token string">&quot;local/redis.conf&quot;</span></span>
<span class="line">        <span class="token property">change_mode</span>   <span class="token punctuation">=</span> <span class="token string">&quot;signal&quot;</span></span>
<span class="line">        <span class="token property">change_signal</span> <span class="token punctuation">=</span> <span class="token string">&quot;SIGHUP&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span> <span class="token punctuation">=</span> <span class="token number">1000</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">1001</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    task <span class="token string">&quot;redis-slave&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">volume_mount</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">volume</span>      <span class="token punctuation">=</span> <span class="token string">&quot;redis-data&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/data&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">volume_mount</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">volume</span>      <span class="token punctuation">=</span> <span class="token string">&quot;redis-cluster&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/slave&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">NODE_IP</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_IP_slave-redis<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">network_mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;redis:5.0.5-buster&quot;</span></span>
<span class="line">        <span class="token property">ports</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;slave&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;redis-server&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_TASK_DIR<span class="token punctuation">}</span></span>/redis.conf&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">port {{ env &quot;NOMAD_PORT_slave&quot; }} </span>
<span class="line">bind  {{ env &quot;NOMAD_IP_slave&quot; }} </span>
<span class="line">#bind  127.0.0.1 ::1</span>
<span class="line">cluster-enabled yes</span>
<span class="line">cluster-config-file /slave/nodes.conf</span>
<span class="line">cluster-node-timeout 3000</span>
<span class="line">appendonly yes</span>
<span class="line"></span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">destination</span>   <span class="token punctuation">=</span> <span class="token string">&quot;local/redis.conf&quot;</span></span>
<span class="line">        <span class="token property">change_mode</span>   <span class="token punctuation">=</span> <span class="token string">&quot;signal&quot;</span></span>
<span class="line">        <span class="token property">change_signal</span> <span class="token punctuation">=</span> <span class="token string">&quot;SIGHUP&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span> <span class="token punctuation">=</span> <span class="token number">1000</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">1001</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[l];function i(c,o){return n(),a("div",null,t)}const d=s(e,[["render",i],["__file","redis.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/redis.html","title":"redis","lang":"ko-KR","frontmatter":{"description":"Nomad Sample","tag":["Nomad","Sample","Job"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/redis.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"redis"}],["meta",{"property":"og:description","content":"Nomad Sample"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"redis\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1633418665000,"updatedTime":1695042774000,"contributors":[{"name":"swbs90","email":"swbs9000@gmail.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"ung","email":"swbs90@naver.com","commits":1}]},"readingTime":{"minutes":4.25,"words":255},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/redis.md","localizedDate":"2021년 10월 5일","excerpt":"\\n<ul>\\n<li>추가내용: redis는 data dir, cluster info dir(클러스터 시) 이 두개의 dir가 필요하여 volume을 추가로 붙여줘야한다.\\n<ul>\\n<li>data dir을 변경이 번거로움(docker build를 다시 해야함) 그래서 클러스터 시에는 docker build, nomad volume으로 나눔과 같은 방법이 있음</li>\\n<li>cluster-enabled : 클러스터로 사용합니다. (cluster volume으로 빼둬야됨)</li>\\n<li>cluster-config-file : 노드별로 클러스터 노드 정보를 conf 파일에 저장합니다.</li>\\n<li>cluster-node-timeout : 노드간 통신이 되지 않아 timeout 되는 시간을 설정합니다.</li>\\n</ul>\\n</li>\\n</ul>"}');export{d as comp,v as data};
