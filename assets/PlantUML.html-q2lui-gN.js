import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},i=e(`<h1 id="uml" tabindex="-1"><a class="header-anchor" href="#uml"><span>UML</span></a></h1><p><a href="https://github.com/gmunguia/markdown-it-plantuml#readme" target="_blank" rel="noopener noreferrer">markdown-it-plantuml</a> 플러그인을 활성화 하여 UML 작성이 가능합니다. 아래는 플러그인 개발자의 안내를 풀어 일부 설명합니다.</p><h2 id="기본-사용법" tabindex="-1"><a class="header-anchor" href="#기본-사용법"><span>기본 사용법</span></a></h2><p>UML 블록은 <code>@startuml</code> 과 <code>@enduml</code> 사이에 UML 구성을 위한 구성을 넣어 표기합니다. 아래와 같이 md 파일 내에 작성하면</p><div class="language-markdown" data-highlighter="prismjs" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="line">@startuml</span>
<span class="line">Bob -&gt; Alice : hello</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre></div><p>다음과 같이 표기됩니다.</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80" alt=""><p>다양한 예제는 <a href="http://plantuml.com/" target="_blank" rel="noopener noreferrer">plantuml.com</a>에서 확인할 수 있습니다.</p><h2 id="plantuml-예제" tabindex="-1"><a class="header-anchor" href="#plantuml-예제"><span>PlantUml 예제</span></a></h2><h3 id="sample-terraform-action" tabindex="-1"><a class="header-anchor" href="#sample-terraform-action"><span>Sample Terraform Action</span></a></h3><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">actor User</span>
<span class="line">interface Terraform</span>
<span class="line">cloud CLOUD</span>
<span class="line"></span>
<span class="line">User -&gt;&gt; Terraform : Apply</span>
<span class="line">User &lt;&lt;- Terraform : State</span>
<span class="line">Terraform -&gt;&gt; CLOUD : Probisioning</span>
<span class="line">CLOUD -&gt;&gt; Terraform : Response</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/NOv13e9034NtFKKlm0KC8HXTccWK3b27OYOPffEsBBoz80kYs__-V_cjEQdFKm8ABegziKBCpZfIOEnObKRH2KAIUS3JvTgV0TOMLaspSppWiPJqtb1TLp_euUGCUx9Elwg5tLIUqQBac5-mXV_cErkHR0mjvs7v-W40" alt=""><h3 id="sequence-diagram" tabindex="-1"><a class="header-anchor" href="#sequence-diagram"><span>Sequence Diagram</span></a></h3><p><a href="http://plantuml.com/sequence-diagram" target="_blank" rel="noopener noreferrer">http://plantuml.com/sequence-diagram</a></p><div class="language-ini" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">Alice -&gt; Bob: Authentication Request</span>
<span class="line">Bob --&gt; Alice: Authentication Response</span>
<span class="line"></span>
<span class="line">Alice -&gt; Bob: Another authentication Request</span>
<span class="line">Alice &lt;-- Bob: another authentication Response</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre></div><img src="https://www.plantuml.com/plantuml/svg/TSx13O0W38NXErDqWIvWZ057S0F49f9WKIZxIyIJmVFxykVfB3P9EO8omJi2d62Ewm2co4uitbdnaM6Xgr0MLJV0QXxSKVcCd4bzOnohIs3xqOP7nARjdtxZcdYhXsy0" alt=""><h3 id="usecase-diagram" tabindex="-1"><a class="header-anchor" href="#usecase-diagram"><span>UseCase Diagram</span></a></h3><p><a href="http://plantuml.com/use-case-diagram" target="_blank" rel="noopener noreferrer">http://plantuml.com/use-case-diagram</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">:Main Admin: as Admin</span>
<span class="line">(Use the application) as (Use)</span>
<span class="line"></span>
<span class="line">User -&gt; (Start)</span>
<span class="line">User --&gt; (Use)</span>
<span class="line"></span>
<span class="line">Admin ---&gt; (Use)</span>
<span class="line"></span>
<span class="line">note right of Admin : This is an example.</span>
<span class="line"></span>
<span class="line">note right of (Use)</span>
<span class="line">  A note can also</span>
<span class="line">  be on several lines</span>
<span class="line">end note</span>
<span class="line"></span>
<span class="line">note &quot;This note is connected\\nto several objects.&quot; as N2</span>
<span class="line">(Start) .. N2</span>
<span class="line">N2 .. (Use)</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/NL0n3i8m3DppYXCJ7UZ0s0710s01DXRJ6XgKEbKJ4C_7IIgGa2BdV3wVusn3f2a-1sUQFLd1hXkiDA1Ga5cU0oFs31f7PrkArakLogbG6QDnmcg3vJ7vL7EUY5BFBahy6F6HCTbx7-5lPGeQd7eRe8S4_APXT5p_Iqi_i4FcMvMI2rwPAyCB0hzu8WTdXODXwR9kTbda0HdgtNeHRYDt5ud-s-Yl3oL3lKZx7TPctWbrdRB3Ee7oYAswwvzz0000" alt=""><h3 id="class-diagram" tabindex="-1"><a class="header-anchor" href="#class-diagram"><span>Class Diagram</span></a></h3><p><a href="http://plantuml.com/class-diagram" target="_blank" rel="noopener noreferrer">http://plantuml.com/class-diagram</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">Object &lt;|-- Dummy</span>
<span class="line"></span>
<span class="line">class Dummy {</span>
<span class="line">  String data</span>
<span class="line">  void methods()</span>
<span class="line">  -field1</span>
<span class="line">  <span class="token comment">#field2</span></span>
<span class="line">  ~method1()</span>
<span class="line">  +method2()</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">class Flight {</span>
<span class="line">   flightNumber : Integer</span>
<span class="line">   departureTime : Date</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">class Car</span>
<span class="line"></span>
<span class="line">Driver - Car : drives &gt;</span>
<span class="line">Car *- Wheel : have 4 &gt;</span>
<span class="line">Car -- Person : &lt; owns</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/HP1B2y8m48Jl-HKBNdoGW-99H0IBu4K51S_Hh6qaIINPLiJ7RtVJAjxccvaCIUQHLA3AMR4vNl14C7rA2Ldbt5s8arKnjW0F0R2ZO7mEMf5YgakZmI4LfOxT7XloRD3g8QjEeqQitcrXs1G6BOmONh_rfJLvGSqyd1kzhjmH0qnWvGbp32dHU4tN3BWt3ZdA5E5_Ow6245amDH-JYRYX4qQOYOHz2OS2qR9Vg1fX_FNvgLiCiVGSJA6y-IZcw3L_nmS0" alt=""><h3 id="activity-diagram" tabindex="-1"><a class="header-anchor" href="#activity-diagram"><span>Activity Diagram</span></a></h3><p><a href="http://plantuml.com/activity-diagram-beta" target="_blank" rel="noopener noreferrer">http://plantuml.com/activity-diagram-beta</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">start</span>
<span class="line">partition Initialization {</span>
<span class="line">    :read config file;</span>
<span class="line">    :init internal variable;</span>
<span class="line">}</span>
<span class="line">partition Running {</span>
<span class="line">    if (multiprocessor?) then (yes)</span>
<span class="line">    fork</span>
<span class="line">        :Treatment 1;</span>
<span class="line">    fork again</span>
<span class="line">        :Treatment 2;</span>
<span class="line">        detach</span>
<span class="line">    end fork</span>
<span class="line">    else (monoproc)</span>
<span class="line">    :Treatment 1;</span>
<span class="line">    :Treatment 2;</span>
<span class="line">    endif</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">stop</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/RL0n3i8m3Dpp2ezqX94EiB8YFc1QfrYaJfMuI83uEswA00aoE3xxT6TxcnMJZdrm9N631LQE0Zkn7mFViC2x0tlhHDX24yLp1vu3rNEPZGmiIaamm0KJut5gFhu4zwC8I_TIOW-BVWpAGueDvHpJfW8zaS3YIhag71_JkIJ5us3UsfCeBEjt6x13bd-aLVskjgJOd0eaQJ-o53BP557YDCJi-MlpgsaYx6qtkraStDQW7V09" alt=""><h3 id="component-diagram" tabindex="-1"><a class="header-anchor" href="#component-diagram"><span>Component Diagram</span></a></h3><p><a href="http://plantuml.com/component-diagram" target="_blank" rel="noopener noreferrer">http://plantuml.com/component-diagram</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">package &quot;Some Group&quot; {</span>
<span class="line">  HTTP - [First Component]</span>
<span class="line">  <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Another Component</span><span class="token punctuation">]</span></span></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">node &quot;Other Groups&quot; {</span>
<span class="line">  FTP - [Second Component]</span>
<span class="line">  <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">First Component</span><span class="token punctuation">]</span></span> --&gt; FTP</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">cloud {</span>
<span class="line">  <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Example 1</span><span class="token punctuation">]</span></span></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">database &quot;MySql&quot; {</span>
<span class="line">  folder &quot;This is my folder&quot; {</span>
<span class="line">    <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Folder 3</span><span class="token punctuation">]</span></span></span>
<span class="line">  }</span>
<span class="line">  frame &quot;Foo&quot; {</span>
<span class="line">    <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Frame 4</span><span class="token punctuation">]</span></span></span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Another Component</span><span class="token punctuation">]</span></span> --&gt; [Example 1]</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Example 1</span><span class="token punctuation">]</span></span> --&gt; [Folder 3]</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Folder 3</span><span class="token punctuation">]</span></span> --&gt; [Frame 4]</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/RP0z2y8m48Rt_8gZUmVHMHInkeX2knM7s4Gh9hcQfA18_xlvgBGK8SDnxztp95aPIxLjfI0DhHxqnY79KNBOQMoR13u4O5yK9qYXpExQMDYWR51nPSykAjSARStrkDiHef0vpZ4a0MGYAOkWd5Ues8GqfKEQBls2vrK2MnO8vVP5PICup8A8C6hfXHfdExppfuYQAmhcp4bHtmsu8zzzAyPU5YVctjpv3KtTcvCCSHW9hKMSyAe_Rmrt75zfLCTi40rbd_puAwwO-_yl" alt=""><h3 id="state-diagram" tabindex="-1"><a class="header-anchor" href="#state-diagram"><span>State Diagram</span></a></h3><p><a href="http://plantuml.com/state-diagram" target="_blank" rel="noopener noreferrer">http://plantuml.com/state-diagram</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">*</span><span class="token punctuation">]</span></span> --&gt; State1</span>
<span class="line">State1 --&gt; [*]</span>
<span class="line">State1 : this is a string</span>
<span class="line">State1 : this is another string</span>
<span class="line"></span>
<span class="line">State1 -&gt; State2</span>
<span class="line">State2 --&gt; [*]</span>
<span class="line"></span>
<span class="line">scale 350 width</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">*</span><span class="token punctuation">]</span></span> --&gt; NotShooting</span>
<span class="line"></span>
<span class="line">state NotShooting {</span>
<span class="line">  <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">*</span><span class="token punctuation">]</span></span> --&gt; Idle</span>
<span class="line">  Idle --&gt; Configuring : EvConfig</span>
<span class="line">  Configuring --&gt; Idle : EvConfig</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">state Configuring {</span>
<span class="line">  <span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">*</span><span class="token punctuation">]</span></span> --&gt; NewValueSelection</span>
<span class="line">  NewValueSelection --&gt; NewValuePreview : EvNewValue</span>
<span class="line">  NewValuePreview --&gt; NewValueSelection : EvNewValueRejected</span>
<span class="line">  NewValuePreview --&gt; NewValueSelection : EvNewValueSaved</span>
<span class="line"></span>
<span class="line">  state NewValuePreview {</span>
<span class="line">     State1 -&gt; State2</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/dL8x2y8m4DxxAsuM2ZvmSH1175oAM70HXz2UDX8JQAxj8FtlNXyfqNQo1C9zhxiatLaIEHKl5LndDmZ3BSGa21T1jxK8CwxS06NI0Yy1bdAf7nECDfHXxlWXgOzUTi1oY0vi8XJ2QZs7IgQK3PD4XkBC66fJR6Fo8NW704vwJ1LosMnjlJVwBXz5Cm1FTYYxcXK-uOo-edQTVA7VASBg8bI1CIfCI1hDt0ZxKfvoB2LMRHU7UIP7JuP_cSxuP1JJlyonADd9rluYVmAQ8_8tUYk0ckzaXphbV-G3" alt=""><h3 id="network-diagram" tabindex="-1"><a class="header-anchor" href="#network-diagram"><span>Network Diagram</span></a></h3><p><a href="https://plantuml.com/nwdiag" target="_blank" rel="noopener noreferrer">https://plantuml.com/nwdiag</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">nwdiag {</span>
<span class="line">  network dmz {</span>
<span class="line">      <span class="token key attr-name">address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">210.x.x.x/24</span>&quot;</span></span>
<span class="line"></span>
<span class="line">      // set multiple addresses (using comma)</span>
<span class="line">      <span class="token key attr-name">web01 [address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;210.x.x.1, 210.x.x.20&quot;];</span></span>
<span class="line">      <span class="token key attr-name">web02 [address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;210.x.x.2&quot;];</span></span>
<span class="line">  }</span>
<span class="line">  network internal {</span>
<span class="line">      <span class="token key attr-name">address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;172.x.x.x/24&quot;;</span></span>
<span class="line"></span>
<span class="line">      <span class="token key attr-name">web01 [address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;172.x.x.1&quot;];</span></span>
<span class="line">      <span class="token key attr-name">web02 [address</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;172.x.x.2&quot;];</span></span>
<span class="line">      db01;</span>
<span class="line">      db02;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/VP312i8m343l_OgmauBODGWUXh3_40_LXb5iEsax9ih-tSsjR8TfSad8ItYa357ws5Z3NAkqhE3D01p5jlPtKFRrxOUGIdaA0KwGeSZtpo4v7Z8spJc7G15iOw9-64ey1TWqGRiARhMrSZlHBLrp0UULes87gSGyknIB1LnTm17g5jxQHV9EcZLvSSHPlc0_VH8d_Zaa26T8zOSMDOvk7Il9gVxD7m00" alt=""><h3 id="gantt-diagram" tabindex="-1"><a class="header-anchor" href="#gantt-diagram"><span>Gantt Diagram</span></a></h3><p><a href="https://plantuml.com/gantt-diagram" target="_blank" rel="noopener noreferrer">https://plantuml.com/gantt-diagram</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">@startgantt</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Prototype design</span><span class="token punctuation">]</span></span> lasts 15 days</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Test prototype</span><span class="token punctuation">]</span></span> lasts 10 days</span>
<span class="line">-- All example --</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Task 1 (1 day)</span><span class="token punctuation">]</span></span> lasts 1 day</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">T2 (5 days)</span><span class="token punctuation">]</span></span> lasts 5 days</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">T3 (1 week)</span><span class="token punctuation">]</span></span> lasts 1 week</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">T4 (1 week and 4 days)</span><span class="token punctuation">]</span></span> lasts 1 week and 4 days</span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">T5 (2 weeks)</span><span class="token punctuation">]</span></span> lasts 2 weeks</span>
<span class="line">@endgantt</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/PP113e8m44NtFSLVugA98Epn1YxS4HTDEY66KWWpHBczBKZLk9lVzzyqRSrY9fbxf-frQeqNKSrb6cIGPIHOudlhRt26XP5Ni6PXrLo91UFUIlYuOQrnTWxqDFte25e7mN2775aU6uSan1HWWMpRd4Yww1IT1r7t9SKOKBaZ66zH_Yxu8q6ea1NhyQVspgecRxV7nobyo0i0" alt=""><h3 id="mindmap" tabindex="-1"><a class="header-anchor" href="#mindmap"><span>MindMap</span></a></h3><p><a href="https://plantuml.com/mindmap-diagram" target="_blank" rel="noopener noreferrer">https://plantuml.com/mindmap-diagram</a></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line">@startuml</span>
<span class="line">@startmindmap</span>
<span class="line">* Debian</span>
<span class="line">** Ubuntu</span>
<span class="line">*** Linux Mint</span>
<span class="line">*** Kubuntu</span>
<span class="line">*** Lubuntu</span>
<span class="line">*** KDE Neon</span>
<span class="line">** LMDE</span>
<span class="line">** SolydXK</span>
<span class="line">** SteamOS</span>
<span class="line">** Raspbian with a very long name</span>
<span class="line"><span class="token key attr-name">*** &lt;s&gt;Raspmbc&lt;/s&gt;</span> <span class="token punctuation">=</span><span class="token value attr-value">&gt; OSMC</span></span>
<span class="line"><span class="token key attr-name">*** &lt;s&gt;Raspyfi&lt;/s&gt;</span> <span class="token punctuation">=</span><span class="token value attr-value">&gt; Volumio</span></span>
<span class="line">@endmindmap</span>
<span class="line">@enduml</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/JOzD3e8m44RtFSMik_42I4Y45I29HEDsaAgJj5D2MvNRInjDMCsRVFEJLpYFimz6YoAH8HuDJa92gGP25bB2UGZimqeI6kBmWPROfxOEcsZ3TLd1KTcqtRHb5MjlzJ9UwuHUeUdwY2TqK_m3R_9FG7YfUG5j-G6CHgLZcSlZb1bksSxbiC-Xwzl3Dbhkz8ykLWT3LXHgzVYvH5uDlm00" alt="">`,48),t=[i];function p(c,r){return s(),a("div",null,t)}const o=n(l,[["render",p],["__file","PlantUML.html.vue"]]),u=JSON.parse('{"path":"/00-Howto/03-Tips/PlantUML.html","title":"UML","lang":"ko-KR","frontmatter":{"description":"UML markdown-it-plantuml 플러그인을 활성화 하여 UML 작성이 가능합니다. 아래는 플러그인 개발자의 안내를 풀어 일부 설명합니다. 기본 사용법 UML 블록은 @startuml 과 @enduml 사이에 UML 구성을 위한 구성을 넣어 표기합니다. 아래와 같이 md 파일 내에 작성하면 다음과 같이 표...","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/00-Howto/03-Tips/PlantUML.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"UML"}],["meta",{"property":"og:description","content":"UML markdown-it-plantuml 플러그인을 활성화 하여 UML 작성이 가능합니다. 아래는 플러그인 개발자의 안내를 풀어 일부 설명합니다. 기본 사용법 UML 블록은 @startuml 과 @enduml 사이에 UML 구성을 위한 구성을 넣어 표기합니다. 아래와 같이 md 파일 내에 작성하면 다음과 같이 표..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"UML\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"기본 사용법","slug":"기본-사용법","link":"#기본-사용법","children":[]},{"level":2,"title":"PlantUml 예제","slug":"plantuml-예제","link":"#plantuml-예제","children":[{"level":3,"title":"Sample Terraform Action","slug":"sample-terraform-action","link":"#sample-terraform-action","children":[]},{"level":3,"title":"Sequence Diagram","slug":"sequence-diagram","link":"#sequence-diagram","children":[]},{"level":3,"title":"UseCase Diagram","slug":"usecase-diagram","link":"#usecase-diagram","children":[]},{"level":3,"title":"Class Diagram","slug":"class-diagram","link":"#class-diagram","children":[]},{"level":3,"title":"Activity Diagram","slug":"activity-diagram","link":"#activity-diagram","children":[]},{"level":3,"title":"Component Diagram","slug":"component-diagram","link":"#component-diagram","children":[]},{"level":3,"title":"State Diagram","slug":"state-diagram","link":"#state-diagram","children":[]},{"level":3,"title":"Network Diagram","slug":"network-diagram","link":"#network-diagram","children":[]},{"level":3,"title":"Gantt Diagram","slug":"gantt-diagram","link":"#gantt-diagram","children":[]},{"level":3,"title":"MindMap","slug":"mindmap","link":"#mindmap","children":[]}]}],"git":{"createdTime":1627894310000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":13.85,"words":831},"filePathRelative":"00-Howto/03-Tips/PlantUML.md","localizedDate":"2021년 8월 2일","excerpt":"\\n<p><a href=\\"https://github.com/gmunguia/markdown-it-plantuml#readme\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">markdown-it-plantuml</a> 플러그인을 활성화 하여 UML 작성이 가능합니다. 아래는 플러그인 개발자의 안내를 풀어 일부 설명합니다.</p>\\n<h2>기본 사용법</h2>\\n<p>UML 블록은 <code>@startuml</code> 과 <code>@enduml</code> 사이에 UML 구성을 위한 구성을 넣어 표기합니다. 아래와 같이 md 파일 내에 작성하면</p>","autoDesc":true}');export{o as comp,u as data};
