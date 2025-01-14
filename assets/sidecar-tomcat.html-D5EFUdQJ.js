import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as e}from"./app-DhMJQ1_3.js";const t={},p=e(`<h1 id="tomcat-sidecar" tabindex="-1"><a class="header-anchor" href="#tomcat-sidecar"><span>tomcat-sidecar</span></a></h1><ul><li>참고 링크 <ul><li><a href="https://discuss.hashicorp.com/t/nomad-error-creating-an-ingress-gateway-with-sidecar-service/24731" target="_blank" rel="noopener noreferrer">https://discuss.hashicorp.com/t/nomad-error-creating-an-ingress-gateway-with-sidecar-service/24731</a></li></ul></li></ul><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;01_tomcat-sidecar&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">#ingress용도의 group</span></span>
<span class="line">  group <span class="token string">&quot;ingress-tomcat&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;bridge&quot;</span></span>
<span class="line">      port <span class="token string">&quot;inbound&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">8080</span></span>
<span class="line">        <span class="token property">to</span>     <span class="token punctuation">=</span> <span class="token number">8080</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;tomcat-ingress&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;8080&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">#여기서부터 sidecar ingress</span></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">gateway</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">ingress</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">listener</span> <span class="token punctuation">{</span></span>
<span class="line">              <span class="token property">port</span>     <span class="token punctuation">=</span> <span class="token number">8080</span></span>
<span class="line">              <span class="token property">protocol</span> <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">              <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">#아래 tomcat group에 service를 호출함</span></span>
<span class="line">                <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">              <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;tomcat&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;bridge&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;backend&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;8080&quot;</span></span>
<span class="line">      <span class="token keyword">connect</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">sidecar_service</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;tomcat&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;tomcat&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),i=[p];function c(l,o){return s(),a("div",null,i)}const d=n(t,[["render",c],["__file","sidecar-tomcat.html.vue"]]),m=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/sidecar-tomcat.html","title":"tomcat-sidecar","lang":"ko-KR","frontmatter":{"description":"Nomad Sample","tag":["Nomad","Sample","Job","sidecar","tomcat"],"author":"Ung","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/sidecar-tomcat.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"tomcat-sidecar"}],["meta",{"property":"og:description","content":"Nomad Sample"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:55:52.000Z"}],["meta",{"property":"article:author","content":"Ung"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:tag","content":"sidecar"}],["meta",{"property":"article:tag","content":"tomcat"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:55:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tomcat-sidecar\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T06:55:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ung\\"}]}"]]},"headers":[],"git":{"createdTime":1634806591000,"updatedTime":1709880952000,"contributors":[{"name":"swbs90","email":"swbs90@naver.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":1.4,"words":84},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/sidecar-tomcat.md","localizedDate":"2021년 10월 21일","excerpt":"\\n<ul>\\n<li>참고 링크\\n<ul>\\n<li><a href=\\"https://discuss.hashicorp.com/t/nomad-error-creating-an-ingress-gateway-with-sidecar-service/24731\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://discuss.hashicorp.com/t/nomad-error-creating-an-ingress-gateway-with-sidecar-service/24731</a></li>\\n</ul>\\n</li>\\n</ul>","copyright":{"author":"Ung"}}');export{d as comp,m as data};
