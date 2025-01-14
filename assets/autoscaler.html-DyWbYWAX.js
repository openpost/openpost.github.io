import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},i=e(`<h1 id="autoscaler" tabindex="-1"><a class="header-anchor" href="#autoscaler"><span>Autoscaler</span></a></h1><ul><li>aws cloud 환경에서 별도의 모니터링 툴을 사용하지 않고 nomad-apm 기능을 이용한 auscaler 구성</li><li>Nomad Autoscaler 다운로드 : <ul><li>VM환경: <a href="https://releases.hashicorp.com/nomad-autoscaler/" target="_blank" rel="noopener noreferrer">https://releases.hashicorp.com/nomad-autoscaler/</a></li><li>Container환경: <a href="https://hub.docker.com/r/hashicorp/nomad-autoscaler" target="_blank" rel="noopener noreferrer">https://hub.docker.com/r/hashicorp/nomad-autoscaler</a> , <a href="https://hub.docker.com/r/hashicorp/nomad-autoscaler-enterprise" target="_blank" rel="noopener noreferrer">https://hub.docker.com/r/hashicorp/nomad-autoscaler-enterprise</a></li></ul></li><li>주요링크 <ul><li>Nomad Autoscaler aws IAM policy 관련 : <a href="https://www.nomadproject.io/tools/autoscaling/plugins/target/aws-asg" target="_blank" rel="noopener noreferrer">https://www.nomadproject.io/tools/autoscaling/plugins/target/aws-asg</a></li><li>Nomad Autoscaler policy 관련 : <a href="https://www.nomadproject.io/tools/autoscaling/policy" target="_blank" rel="noopener noreferrer">https://www.nomadproject.io/tools/autoscaling/policy</a></li><li>Nomad Autoscaler의 nomad-apm 을 사용하는 경우 : <a href="https://www.nomadproject.io/tools/autoscaling/plugins/apm/nomad" target="_blank" rel="noopener noreferrer">https://www.nomadproject.io/tools/autoscaling/plugins/apm/nomad</a></li></ul></li></ul><h2 id="nomad-autoscaler-sample-job" tabindex="-1"><a class="header-anchor" href="#nomad-autoscaler-sample-job"><span>Nomad Autoscaler - sample job</span></a></h2><ul><li>Nomad Autoscaler는 Container환경과 Non-Container환경 모두 설치 가능</li><li>디버깅이 필요한 경우 <code>log_level = &quot;DEBUG&quot;</code> 옵션 설정</li><li>Nomad Autoscaler sampe job의 <code>target &quot;aws-asg&quot;</code> 설정방법 <ul><li>aws_asg_name은 aws cloud 환경의 Auto Scaling 그룹에 존재해야 함.</li><li>node_class는 nomad client에 동일하게 설정해야 함.</li></ul></li><li>주요 튜닝 포인트 <ul><li><code>policy</code>의 cooldown, evaluation_interval 값을 워크로드 특성에 맞게 적절하게 설정</li></ul></li><li>오토스케일링 기준 <ul><li>메모리 : <code>check &quot;mem_allocated_percentage&quot;</code></li><li>cpu : <code>check &quot;cpu_allocated_percentage&quot;</code></li></ul></li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">autoscaler_ver</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.3.3&quot;</span></span>
<span class="line">    <span class="token comment">#autoscaler_ver = &quot;0.3.5&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;autoscalerEnt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;autoscalerEnt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;autoscaler&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// docker 기반의 Nomad Autoscaler는 다음과 같이 설정 </span></span>
<span class="line">      <span class="token comment">//   driver = &quot;docker&quot;</span></span>
<span class="line">      <span class="token comment">//   config {</span></span>
<span class="line">      <span class="token comment">//     image   = &quot;hashicorp/nomad-autoscaler-enterprise:0.3.3&quot;</span></span>
<span class="line">      <span class="token comment">//     command = &quot;nomad-autoscaler&quot;</span></span>
<span class="line">      <span class="token comment">//     args = [</span></span>
<span class="line">      <span class="token comment">//       &quot;agent&quot;,</span></span>
<span class="line">      <span class="token comment">//       &quot;-config&quot;,</span></span>
<span class="line">      <span class="token comment">//       &quot;$\${NOMAD_TASK_DIR}/config.hcl&quot;,</span></span>
<span class="line">      <span class="token comment">//       &quot;-policy-dir&quot;,</span></span>
<span class="line">      <span class="token comment">//       &quot;$\${NOMAD_TASK_DIR}/policies/&quot;,</span></span>
<span class="line">      <span class="token comment">//     ]</span></span>
<span class="line">      <span class="token comment">//     ports = [&quot;http&quot;]</span></span>
<span class="line">      <span class="token comment">//   }</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;exec&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;/usr/local/bin/nomad-autoscaler&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;agent&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;-config&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;$\${NOMAD_TASK_DIR}/config.hcl&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;-http-bind-address&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;0.0.0.0&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;-http-bind-port&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;$\${NOMAD_PORT_http}&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;-policy-dir&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;$\${NOMAD_TASK_DIR}/policies/&quot;</span>,</span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span>      <span class="token punctuation">=</span> <span class="token string">&quot;https://releases.hashicorp.com/nomad-autoscaler/<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">autoscaler_ver</span><span class="token punctuation">}</span></span>+ent/nomad-autoscaler_<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">autoscaler_ver</span><span class="token punctuation">}</span></span>+ent_linux_amd64.zip&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/usr/local/bin&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span>        <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">nomad {</span>
<span class="line">  address = &quot;http://{{env &quot;attr.unique.network.ip-address&quot; }}:4646&quot;  #Adding nomad server addresss</span>
<span class="line">  token = &quot;&lt;#Adding nomad server token &gt;&quot;  </span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">apm &quot;nomad-apm&quot; {</span>
<span class="line">  driver = &quot;nomad-apm&quot;</span>
<span class="line">  config  = {</span>
<span class="line">    address = &quot;http://{{env &quot;attr.unique.network.ip-address&quot; }}:4646&quot;</span>
<span class="line">  }  </span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">dynamic_application_sizing {</span>
<span class="line">  // Lower the evaluate interval so we can reproduce recommendations after only</span>
<span class="line">  // 5 minutes, rather than having to wait for 24hrs as is the default.</span>
<span class="line">  evaluate_after = &quot;5m&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">#log_level = &quot;DEBUG&quot;</span>
<span class="line"></span>
<span class="line">target &quot;aws-asg&quot; {</span>
<span class="line">  driver = &quot;aws-asg&quot;</span>
<span class="line">  config = {</span>
<span class="line">    aws_region = &quot;{{ $x := env &quot;attr.platform.aws.placement.availability-zone&quot; }}{{ $length := len $x |subtract 1 }}{{ slice $x 0 $length}}&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">strategy &quot;target-value&quot; {</span>
<span class="line">  driver = &quot;target-value&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">  EOF</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;$\${NOMAD_TASK_DIR}/config.hcl&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">scaling &quot;cluster_policy_media&quot; {</span>
<span class="line">  enabled = true</span>
<span class="line">  min     = 1</span>
<span class="line">  max     = 100</span>
<span class="line">  </span>
<span class="line">  policy {</span>
<span class="line">    cooldown            = &quot;5m&quot;</span>
<span class="line">    evaluation_interval = &quot;20s&quot;</span>
<span class="line">    </span>
<span class="line">    check &quot;mem_allocated_percentage&quot; {</span>
<span class="line">      source = &quot;nomad-apm&quot;</span>
<span class="line">      query  = &quot;percentage-allocated_memory&quot;</span>
<span class="line">      strategy &quot;target-value&quot; {</span>
<span class="line">        target = 82</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    // check &quot;cpu_allocated_percentage&quot; {</span>
<span class="line">    //   source = &quot;nomad-apm&quot;</span>
<span class="line">    //   query  = &quot;percentage-allocated_cpu&quot;</span>
<span class="line"></span>
<span class="line">    //   strategy &quot;target-value&quot; {</span>
<span class="line">    //     target = 80</span>
<span class="line">    //   }</span>
<span class="line">    // }    </span>
<span class="line"></span>
<span class="line">    target &quot;aws-asg&quot; {</span>
<span class="line">      dry-run             = &quot;false&quot;</span>
<span class="line">      aws_asg_name        = &quot;nomad_client_media_autoscaler&quot; </span>
<span class="line">      node_class          = &quot;client_web&quot;</span>
<span class="line">      node_drain_deadline = &quot;3m&quot;</span>
<span class="line">      node_purge          = &quot;true&quot;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">EOF</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;$\${NOMAD_TASK_DIR}/policies/hashistack.hcl&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">200</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">256</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;autoscaler&quot;</span></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">        <span class="token property">provider</span> <span class="token punctuation">=</span> <span class="token string">&quot;nomad&quot;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">type</span>     <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">          <span class="token property">path</span>     <span class="token punctuation">=</span> <span class="token string">&quot;/v1/health&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;5s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[i];function p(o,c){return s(),a("div",null,t)}const d=n(l,[["render",p],["__file","autoscaler.html.vue"]]),m=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/autoscaler.html","title":"Autoscaler","lang":"ko-KR","frontmatter":{"description":"Nomad autoscaler for aws","tag":["Nomad","sample","job","autoscaler","aws"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/autoscaler.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Autoscaler"}],["meta",{"property":"og:description","content":"Nomad autoscaler for aws"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:55:52.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"sample"}],["meta",{"property":"article:tag","content":"job"}],["meta",{"property":"article:tag","content":"autoscaler"}],["meta",{"property":"article:tag","content":"aws"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:55:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Autoscaler\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T06:55:52.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Nomad Autoscaler - sample job","slug":"nomad-autoscaler-sample-job","link":"#nomad-autoscaler-sample-job","children":[]}],"git":{"createdTime":1644990252000,"updatedTime":1709880952000,"contributors":[{"name":"Euimokna-cn","email":"myneck@cnmail.co.kr","commits":3},{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"euimokna","email":"31657666+euimokna@users.noreply.github.com","commits":1},{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":6.05,"words":363},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/autoscaler.md","localizedDate":"2022년 2월 16일","excerpt":"\\n<ul>\\n<li>aws cloud 환경에서 별도의 모니터링 툴을 사용하지 않고 nomad-apm 기능을 이용한 auscaler 구성</li>\\n<li>Nomad Autoscaler 다운로드 :\\n<ul>\\n<li>VM환경: <a href=\\"https://releases.hashicorp.com/nomad-autoscaler/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://releases.hashicorp.com/nomad-autoscaler/</a></li>\\n<li>Container환경: <a href=\\"https://hub.docker.com/r/hashicorp/nomad-autoscaler\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://hub.docker.com/r/hashicorp/nomad-autoscaler</a> , <a href=\\"https://hub.docker.com/r/hashicorp/nomad-autoscaler-enterprise\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://hub.docker.com/r/hashicorp/nomad-autoscaler-enterprise</a></li>\\n</ul>\\n</li>\\n<li>주요링크\\n<ul>\\n<li>Nomad Autoscaler aws IAM policy 관련 : <a href=\\"https://www.nomadproject.io/tools/autoscaling/plugins/target/aws-asg\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.nomadproject.io/tools/autoscaling/plugins/target/aws-asg</a></li>\\n<li>Nomad Autoscaler policy 관련 : <a href=\\"https://www.nomadproject.io/tools/autoscaling/policy\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.nomadproject.io/tools/autoscaling/policy</a></li>\\n<li>Nomad Autoscaler의 nomad-apm 을 사용하는 경우 : <a href=\\"https://www.nomadproject.io/tools/autoscaling/plugins/apm/nomad\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.nomadproject.io/tools/autoscaling/plugins/apm/nomad</a></li>\\n</ul>\\n</li>\\n</ul>"}');export{d as comp,m as data};
