import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as i,c as t,b as a,h as n}from"./app-DhMJQ1_3.js";const r={},o=n('<h1 id="chart" tabindex="-1"><a class="header-anchor" href="#chart"><span>Chart</span></a></h1><p>문서 작성시 차트를 추가하는 방법을 안내합니다.</p><ul><li><a href="https://theme-hope.vuejs.press/guide/markdown/chart.html" target="_blank" rel="noopener noreferrer">공식 문서</a></li></ul><p>차트 구성 방식은 <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">ChartJS</a>를 따릅니다.</p><p><code>::: chart</code> 와 <code>:::</code>로 처리합니다.</p><h2 id="기본-사용법-bar" tabindex="-1"><a class="header-anchor" href="#기본-사용법-bar"><span>기본 사용법 - Bar</span></a></h2>',6),c=n(`<details class="hint-container details"><summary>CODE</summary><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="line">::: chart A bar chart</span>
<span class="line"></span>
<span class="line"><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span></span>
<span class="line"><span class="token code-block language-json">{</span>
<span class="line">  &quot;type&quot;: &quot;bar&quot;,</span>
<span class="line">  &quot;data&quot;: {</span>
<span class="line">    &quot;labels&quot;: [&quot;Red&quot;, &quot;Orange&quot;, &quot;Yellow&quot;, &quot;Green&quot;, &quot;Blue&quot;, &quot;Purple&quot;],</span>
<span class="line">    &quot;datasets&quot;: [{</span>
<span class="line">      &quot;label&quot;: &quot;My First Dataset&quot;,</span>
<span class="line">      &quot;data&quot;: [12, 19, 3, 5, 2, 3],</span>
<span class="line">      &quot;backgroundColor&quot;: [</span>
<span class="line">        &quot;rgba(255, 99, 132, 0.2)&quot;,</span>
<span class="line">        &quot;rgba(255, 159, 64, 0.2)&quot;,</span>
<span class="line">        &quot;rgba(255, 205, 86, 0.2)&quot;,</span>
<span class="line">        &quot;rgba(75, 192, 192, 0.2)&quot;,</span>
<span class="line">        &quot;rgba(54, 162, 235, 0.2)&quot;,</span>
<span class="line">        &quot;rgba(153, 102, 255, 0.2)&quot;</span>
<span class="line">      ],</span>
<span class="line">      &quot;borderColor&quot;: [</span>
<span class="line">        &quot;rgb(255, 99, 132)&quot;,</span>
<span class="line">        &quot;rgb(255, 159, 64)&quot;,</span>
<span class="line">        &quot;rgb(255, 205, 86)&quot;,</span>
<span class="line">        &quot;rgb(75, 192, 192)&quot;,</span>
<span class="line">        &quot;rgb(54, 162, 235)&quot;,</span>
<span class="line">        &quot;rgb(153, 102, 255)&quot;</span>
<span class="line">      ],</span>
<span class="line">      &quot;borderWidth&quot;: 1</span>
<span class="line">    }]</span>
<span class="line">  },</span>
<span class="line">  &quot;options&quot;: {</span>
<span class="line">    &quot;scales&quot;: {</span>
<span class="line">      &quot;y&quot;: {</span>
<span class="line">        &quot;ticks&quot;: {</span>
<span class="line">          &quot;beginAtZero&quot;: true,</span>
<span class="line">          &quot;callback&quot;: &quot;function(value){ return &#39;$&#39; + value + &#39;k&#39;; }&quot;</span>
<span class="line">        },</span>
<span class="line">        &quot;beginAtZero&quot;: true</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span></span>
<span class="line"><span class="token punctuation">\`\`\`</span></span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="기본-사용법-bubble" tabindex="-1"><a class="header-anchor" href="#기본-사용법-bubble"><span>기본 사용법 - Bubble</span></a></h2>`,2),d=n(`<details class="hint-container details"><summary>CODE</summary><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="line">::: chart A Bubble Chart</span>
<span class="line"></span>
<span class="line"><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span></span>
<span class="line"><span class="token code-block language-json">{</span>
<span class="line">  &quot;type&quot;: &quot;bubble&quot;,</span>
<span class="line">  &quot;data&quot;: {</span>
<span class="line">    &quot;datasets&quot;: [</span>
<span class="line">      {</span>
<span class="line">        &quot;label&quot;: &quot;First Dataset&quot;,</span>
<span class="line">        &quot;data&quot;: [</span>
<span class="line">          { &quot;x&quot;: 20, &quot;y&quot;: 30, &quot;r&quot;: 15 },</span>
<span class="line">          { &quot;x&quot;: 40, &quot;y&quot;: 10, &quot;r&quot;: 10 }</span>
<span class="line">        ],</span>
<span class="line">        &quot;backgroundColor&quot;: &quot;rgb(255, 99, 132)&quot;</span>
<span class="line">      }</span>
<span class="line">    ]</span>
<span class="line">  }</span>
<span class="line">}</span></span>
<span class="line"><span class="token punctuation">\`\`\`</span></span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,1);function u(p,v){const s=l("ChartJS");return i(),t("div",null,[o,a(s,{id:"chart-22",config:"eJx9UstOwzAQvPcrLAspVESoTkihcOIhOCEQFwSoBycxIaplV44Dqqr8O7uO2ya04ZJ4d2Znd6RZjwihdrUU9JLQlBsaYiPnlkMDQagkT4WsoP6gLyKnIaFPhqtC4OtNSKl/8PVghFD4uJG1g55rs5SCzlHRa1bCOp1WeCONqx9X5L40lSV3Lc3dsZ3DGRaFhM1CEockCQkUsVcGTsqzRWF0rfJbLbVBuocANEXKj6MEhmYwzmIYnZxG4+2GHoUlwJme/UeJJvC5mA5QzlFk5m4dWpSAPJsCGsVAPkhhCdhkE+TgSsfxlI5rbXJhDjvuGf6r37N6GPQm98CuvT2wa2wP7FkadPNa5vYL3DDXbubwa1wk9dKWWmF6fCqrjEuxq6Gz6hSY6jJbdPF2iyhKdW3fhdEAWVOL3ZkAg6bEMGEkP2uV4c7jbw6JHq+JEbY2igRHATkhrgn/YBFckWZjx187uMxjTesOzY2a0S+eGcjH",title:"A%20bar%20chart",type:"json"}),c,a(s,{id:"chart-31",config:"eJxNjUEOwiAURPc9xc9facKiUFnUrcZLmC7AksZIxABNbAx3FyhFN2SYeTP/0wCgX14Kj4ByllIrJMkbhRfRS3n5OeVddK7ZgZLkVAupdBq43K3zcF7hvFOIsrZ1cx/wHS3WEsAlii4JGwXlEH7VCh42kFawhVC54e+aFLfHZM38HE9Gm4SineSOcU6g7wnQju2x4OvCEN/QhOYLM1k72g==",title:"A%20Bubble%20Chart",type:"json"}),d])}const h=e(r,[["render",u],["__file","Chart.html.vue"]]),q=JSON.parse('{"path":"/00-Howto/03-Tips/Chart.html","title":"Chart","lang":"ko-KR","frontmatter":{"description":"Chart 문서 작성시 차트를 추가하는 방법을 안내합니다. 공식 문서 차트 구성 방식은 ChartJS를 따릅니다. ::: chart 와 :::로 처리합니다. 기본 사용법 - Bar CODE 기본 사용법 - Bubble CODE","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/00-Howto/03-Tips/Chart.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Chart"}],["meta",{"property":"og:description","content":"Chart 문서 작성시 차트를 추가하는 방법을 안내합니다. 공식 문서 차트 구성 방식은 ChartJS를 따릅니다. ::: chart 와 :::로 처리합니다. 기본 사용법 - Bar CODE 기본 사용법 - Bubble CODE"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-02-15T08:16:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-15T08:16:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Chart\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-15T08:16:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"기본 사용법 - Bar","slug":"기본-사용법-bar","link":"#기본-사용법-bar","children":[]},{"level":2,"title":"기본 사용법 - Bubble","slug":"기본-사용법-bubble","link":"#기본-사용법-bubble","children":[]}],"git":{"createdTime":1663987184000,"updatedTime":1707984977000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":3}]},"readingTime":{"minutes":4.62,"words":277},"filePathRelative":"00-Howto/03-Tips/Chart.md","localizedDate":"2022년 9월 24일","excerpt":"\\n<p>문서 작성시 차트를 추가하는 방법을 안내합니다.</p>\\n<ul>\\n<li><a href=\\"https://theme-hope.vuejs.press/guide/markdown/chart.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">공식 문서</a></li>\\n</ul>\\n<p>차트 구성 방식은 <a href=\\"https://www.chartjs.org/docs/latest/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">ChartJS</a>를 따릅니다.</p>\\n<p><code>::: chart</code> 와 <code>:::</code>로 처리합니다.</p>","autoDesc":true}');export{h as comp,q as data};
