import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},p=e(`<h1 id="nomad에서-ansible로-docker-설치와-template-주의사항" tabindex="-1"><a class="header-anchor" href="#nomad에서-ansible로-docker-설치와-template-주의사항"><span>Nomad에서 Ansible로 Docker 설치와 Template 주의사항</span></a></h1><blockquote><p>참고 : <a href="https://discuss.hashicorp.com/t/escape-characters-recognized-as-a-variable-in-template-stanza/40525" target="_blank" rel="noopener noreferrer">https://discuss.hashicorp.com/t/escape-characters-recognized-as-a-variable-in-template-stanza/40525</a></p></blockquote><p>Nomad를 통해 Ops작업을 수행할 때 <code>sysbatch</code> 타입의 Job에 Ansible을 <code>raw_exec</code>로 실행하면 전체 노드에서 일괄로 작업을 수행할 수 있다.</p><p>Ansible에서 사용하는 문법 중 <code>{{}}</code>의 부호로 팩트를 사용하는 경우 Nomad에서 사용하는 Template의 <code>{{}}</code>과 겹쳐 오류가 발생한다.</p><div class="language-log" data-highlighter="prismjs" data-ext="log" data-title="log"><pre class="language-log"><code><span class="line"><span class="token property">Template failed:</span> <span class="token operator">(</span>dynamic<span class="token operator">)</span><span class="token operator">:</span> parse<span class="token operator">:</span> template<span class="token operator">:</span> <span class="token operator">:</span><span class="token number">23</span><span class="token operator">:</span> function <span class="token string">&quot;ansible_distribution_release&quot;</span> not defined</span>
<span class="line"></span></code></pre></div><p>이경우 Nomad에서 다음과 같이 표기하여 템플릿 문자에 대한 치환이 가능하다.</p><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"> <span class="token punctuation">{</span><span class="token punctuation">{</span> --&gt; <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token string">&quot;{{&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span><span class="token punctuation">}</span> --&gt; <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token string">&quot;}}&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>다음은 Ansible에서 <code>apt_repository</code> 수행 시 <code>ansible_architecture</code>와 <code>ansible_distribution_release</code> 같은 팩트 값을 Template으로 Playbook을 작성한 예제 이다.</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;install-ansible-docker&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;hashitalks-kr&quot;</span><span class="token punctuation">]</span>  <span class="token comment"># 사용할 데이터 센터 이름으로 수정</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;sysbatch&quot;</span>  <span class="token comment"># 배치 작업 유형</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">constraint</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">attribute</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>attr<span class="token punctuation">.</span>os<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">    <span class="token property">value</span>     <span class="token punctuation">=</span> <span class="token string">&quot;ubuntu&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">parameterized</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">payload</span>       <span class="token punctuation">=</span> <span class="token string">&quot;forbidden&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;install- group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;install-ansible-task&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">lifecycle</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">hook</span> <span class="token punctuation">=</span> <span class="token string">&quot;prestart&quot;</span></span>
<span class="line">        <span class="token property">sidecar</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      </span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;raw_exec&quot;</span>  <span class="token comment"># 외부 스크립트를 실행</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/install_ansible.sh&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/install_ansible.sh&quot;</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">#!/bin/bash</span>
<span class="line">sudo apt-get update</span>
<span class="line">sudo apt-get install -y ansible</span>
<span class="line">EOF</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;install-docker-task&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;raw_exec&quot;</span>  <span class="token comment"># 외부 스크립트를 실행</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;ansible-playbook&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;local/playbook.yml&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">JAVA_VERSION</span> <span class="token punctuation">=</span> <span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>NOMAD_META_DesiredJavaVersion<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/playbook.yml&quot;</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">---</span>
<span class="line">- hosts:</span>
<span class="line">    - localhost</span>
<span class="line">  become: yes</span>
<span class="line">  tasks:</span>
<span class="line">    - name: Install aptitude</span>
<span class="line">      apt:</span>
<span class="line">        name: aptitude</span>
<span class="line">        state: latest</span>
<span class="line">        update_cache: true</span>
<span class="line"></span>
<span class="line">    - name: Install required packages</span>
<span class="line">      apt:</span>
<span class="line">        pkg:</span>
<span class="line">          - apt-transport-https</span>
<span class="line">          - ca-certificates</span>
<span class="line">          - curl</span>
<span class="line">          - software-properties-common</span>
<span class="line">          - python3-pip</span>
<span class="line">          - virtualenv</span>
<span class="line">          - python3-setuptools</span>
<span class="line">        state: latest</span>
<span class="line">        update_cache: true</span>
<span class="line"></span>
<span class="line">    - name: Add Docker GPG apt Key</span>
<span class="line">      apt_key:</span>
<span class="line">        url: https://download.docker.com/linux/ubuntu/gpg</span>
<span class="line">        state: present</span>
<span class="line"></span>
<span class="line">    - name: Add Docker repository</span>
<span class="line">      apt_repository:</span>
<span class="line">        repo: &quot;deb [arch={{ env &quot;attr.cpu.arch&quot; }}] https://download.docker.com/linux/ubuntu {{&quot;{{&quot;}} ansible_lsb.codename {{&quot;}}&quot;}} stable&quot;</span>
<span class="line">        state: present</span>
<span class="line">        update_cache: true</span>
<span class="line"></span>
<span class="line">    - name: Update the apt package index</span>
<span class="line">      apt:</span>
<span class="line">        update_cache: true</span>
<span class="line"></span>
<span class="line">    - name: Install Docker CE</span>
<span class="line">      apt:</span>
<span class="line">        name: docker-ce</span>
<span class="line">        state: latest</span>
<span class="line"></span>
<span class="line">    - name: Install Docker CE etc.</span>
<span class="line">      apt:</span>
<span class="line">        name:</span>
<span class="line">          - docker-ce-cli</span>
<span class="line">          - containerd.io</span>
<span class="line">          - docker-buildx-plugin</span>
<span class="line">          - docker-compose-plugin</span>
<span class="line">        state: present</span>
<span class="line"></span>
<span class="line">    - name: Ensure Docker starts on boot</span>
<span class="line">      service:</span>
<span class="line">        name: docker</span>
<span class="line">        enabled: true</span>
<span class="line">        state: started</span>
<span class="line">EOF</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">500</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">256</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),i=[p];function t(c,o){return n(),a("div",null,i)}const u=s(l,[["render",t],["__file","install-ansible-docker.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/install-ansible-docker.html","title":"Nomad에서 Ansible로 Docker 설치와 Template 주의사항","lang":"ko-KR","frontmatter":{"description":"Nomad에서 Aisnble 실행 및 템플릿 주의사항","tag":["Nomad","Ansible","Job","Docker"],"author":"GS","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/install-ansible-docker.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Nomad에서 Ansible로 Docker 설치와 Template 주의사항"}],["meta",{"property":"og:description","content":"Nomad에서 Aisnble 실행 및 템플릿 주의사항"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:55:52.000Z"}],["meta",{"property":"article:author","content":"GS"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Ansible"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:55:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nomad에서 Ansible로 Docker 설치와 Template 주의사항\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T06:55:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GS\\"}]}"]]},"headers":[],"git":{"createdTime":1693382360000,"updatedTime":1709880952000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":3},{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":4.23,"words":254},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/install-ansible-docker.md","localizedDate":"2023년 8월 30일","excerpt":"\\n<blockquote>\\n<p>참고 : <a href=\\"https://discuss.hashicorp.com/t/escape-characters-recognized-as-a-variable-in-template-stanza/40525\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://discuss.hashicorp.com/t/escape-characters-recognized-as-a-variable-in-template-stanza/40525</a></p>\\n</blockquote>\\n<p>Nomad를 통해 Ops작업을 수행할 때 <code>sysbatch</code> 타입의 Job에 Ansible을 <code>raw_exec</code>로 실행하면 전체 노드에서 일괄로 작업을 수행할 수 있다.</p>","copyright":{"author":"GS"}}');export{u as comp,v as data};
