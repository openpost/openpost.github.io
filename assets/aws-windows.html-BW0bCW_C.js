import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as e}from"./app-DhMJQ1_3.js";const p={},t=e(`<h1 id="aws-packer-sample-windows" tabindex="-1"><a class="header-anchor" href="#aws-packer-sample-windows"><span>AWS Packer Sample - Windows</span></a></h1><blockquote><p>참고 : <a href="https://learn.hashicorp.com/tutorials/packer/aws-windows-image?in=packer/integrations" target="_blank" rel="noopener noreferrer">Build a Windows Image</a></p></blockquote><h2 id="windows-pkr-hcl" tabindex="-1"><a class="header-anchor" href="#windows-pkr-hcl"><span>windows.pkr.hcl</span></a></h2><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;region&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;ap-northeast-2&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;cni-version&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;1.0.1&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">nomad_url</span>  <span class="token punctuation">=</span> <span class="token string">&quot;https://releases.hashicorp.com/nomad/1.2.3/nomad_1.2.3_windows_amd64.zip&quot;</span></span>
<span class="line">  <span class="token property">consul_url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://releases.hashicorp.com/consul/1.11.1/consul_1.11.1_windows_amd64.zip&quot;</span></span>
<span class="line">  <span class="token property">jre_url</span>    <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.13%2B8/OpenJDK11U-jre_x64_windows_hotspot_11.0.13_8.zip&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">packer</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">required_plugins</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">amazon</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;&gt;= 0.0.2&quot;</span></span>
<span class="line">      <span class="token property">source</span>  <span class="token punctuation">=</span> <span class="token string">&quot;github.com/hashicorp/amazon&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">source <span class="token string">&quot;amazon-ebs&quot;</span> <span class="token string">&quot;example&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">ami_name</span>      <span class="token punctuation">=</span> <span class="token string">&quot;gs_demo_windows_{{timestamp}}&quot;</span></span>
<span class="line">  <span class="token property">communicator</span>  <span class="token punctuation">=</span> <span class="token string">&quot;winrm&quot;</span></span>
<span class="line">  <span class="token property">instance_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;t2.micro&quot;</span></span>
<span class="line">  <span class="token property">region</span>        <span class="token punctuation">=</span> var.region</span>
<span class="line">  <span class="token keyword">source_ami_filter</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">filters</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span>                <span class="token punctuation">=</span> <span class="token string">&quot;*Windows_Server-2019-English-Full-Base*&quot;</span></span>
<span class="line">      <span class="token property">root-device-type</span>    <span class="token punctuation">=</span> <span class="token string">&quot;ebs&quot;</span></span>
<span class="line">      <span class="token property">virtualization-type</span> <span class="token punctuation">=</span> <span class="token string">&quot;hvm&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token property">most_recent</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token property">owners</span>      <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;amazon&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token property">user_data_file</span> <span class="token punctuation">=</span> <span class="token string">&quot;./bootstrap_win.txt&quot;</span></span>
<span class="line">  <span class="token property">winrm_password</span> <span class="token punctuation">=</span> <span class="token string">&quot;SuperS3cr3t!!!!&quot;</span></span>
<span class="line">  <span class="token property">winrm_username</span> <span class="token punctuation">=</span> <span class="token string">&quot;Administrator&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">build</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">sources</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;source.amazon-ebs.example&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">provisioner<span class="token type variable"> &quot;powershell&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">inline</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\temp\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// provisioner &quot;file&quot; {</span></span>
<span class="line">  <span class="token comment">//   source = &quot;./file/&quot;</span></span>
<span class="line">  <span class="token comment">//   destination = &quot;/tmp&quot;</span></span>
<span class="line">  <span class="token comment">// }</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">provisioner<span class="token type variable"> &quot;powershell&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">inline</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\jre\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\consul\\\\bin\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\consul\\\\data\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\consul\\\\conf\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\nomad\\\\bin\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\nomad\\\\data\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;New-Item \\&quot;C:\\\\hashicorp\\\\nomad\\\\conf\\\\\\&quot; -ItemType Directory&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;Invoke-WebRequest -Uri <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">jre_url</span><span class="token punctuation">}</span></span> -OutFile $env:TEMP\\\\jre.zip&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;Invoke-WebRequest -Uri <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">consul_url</span><span class="token punctuation">}</span></span> -OutFile $env:TEMP\\\\consul.zip&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;Invoke-WebRequest -Uri <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">nomad_url</span><span class="token punctuation">}</span></span> -OutFile $env:TEMP\\\\nomad.zip&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;Expand-Archive $env:TEMP\\\\jre.zip -DestinationPath C:\\\\hashicorp\\\\jre\\\\&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;Expand-Archive $env:TEMP\\\\consul.zip -DestinationPath C:\\\\hashicorp\\\\consul\\\\bin\\\\&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;Expand-Archive $env:TEMP\\\\nomad.zip -DestinationPath C:\\\\hashicorp\\\\nomad\\\\bin\\\\&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;[Environment]::SetEnvironmentVariable(\\&quot;Path\\&quot;, $env:Path + \\&quot;;C:\\\\hashicorp\\\\jre\\\\jdk-11.0.13+8-jre\\\\bin;C:\\\\hashicorp\\\\nomad\\\\bin;C:\\\\hashicorp\\\\consul\\\\bin\\&quot;, \\&quot;Machine\\&quot;)&quot;</span>,</span>
<span class="line">      <span class="token comment">// &quot;$old = (Get-ItemProperty -Path &#39;Registry::HKEY_LOCAL_MACHINE\\\\System\\\\CurrentControlSet\\\\Control\\\\Session Manager\\\\Environment&#39; -Name path).path&quot;,</span></span>
<span class="line">      <span class="token comment">// &quot;$new = \\&quot;$old;C:\\\\hashicorp\\\\jre\\\\jdk-11.0.13+8-jre\\\\bin;C:\\\\hashicorp\\\\nomad\\\\bin;C:\\\\hashicorp\\\\consul\\\\bin\\&quot;&quot;,</span></span>
<span class="line">      <span class="token comment">// &quot;Set-ItemProperty -Path &#39;Registry::HKEY_LOCAL_MACHINE\\\\System\\\\CurrentControlSet\\\\Control\\\\Session Manager\\\\Environment&#39; -Name path -Value $new&quot;,</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bootstrap-win-txt" tabindex="-1"><a class="header-anchor" href="#bootstrap-win-txt"><span>bootstrap_win.txt</span></a></h2><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="line">&lt;powershell&gt;</span>
<span class="line"><span class="token comment"># Set administrator password</span></span>
<span class="line">net user Administrator SuperS3cr3t!<span class="token operator">!</span><span class="token operator">!</span><span class="token operator">!</span></span>
<span class="line">wmic useraccount where <span class="token string">&quot;name=&#39;Administrator&#39;&quot;</span> <span class="token function">set</span> PasswordExpires=FALSE</span>
<span class="line"></span>
<span class="line"><span class="token comment"># First, make sure WinRM can&#39;t be connected to</span></span>
<span class="line">netsh advfirewall firewall <span class="token function">set</span> rule name=<span class="token string">&quot;Windows Remote Management (HTTP-In)&quot;</span> new enable=yes action=block</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Delete any existing WinRM listeners</span></span>
<span class="line">winrm delete winrm/config/listener?Address=<span class="token operator">*</span><span class="token operator">+</span>Transport=HTTP  2&gt;<span class="token variable">$Null</span></span>
<span class="line">winrm delete winrm/config/listener?Address=<span class="token operator">*</span><span class="token operator">+</span>Transport=HTTPS 2&gt;<span class="token variable">$Null</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Disable group policies which block basic authentication and unencrypted login</span></span>
<span class="line"></span>
<span class="line"><span class="token function">Set-ItemProperty</span> <span class="token operator">-</span>Path HKLM:\\Software\\Policies\\Microsoft\\Windows\\WinRM\\Client <span class="token operator">-</span>Name AllowBasic <span class="token operator">-</span>Value 1</span>
<span class="line"><span class="token function">Set-ItemProperty</span> <span class="token operator">-</span>Path HKLM:\\Software\\Policies\\Microsoft\\Windows\\WinRM\\Client <span class="token operator">-</span>Name AllowUnencryptedTraffic <span class="token operator">-</span>Value 1</span>
<span class="line"><span class="token function">Set-ItemProperty</span> <span class="token operator">-</span>Path HKLM:\\Software\\Policies\\Microsoft\\Windows\\WinRM\\Service <span class="token operator">-</span>Name AllowBasic <span class="token operator">-</span>Value 1</span>
<span class="line"><span class="token function">Set-ItemProperty</span> <span class="token operator">-</span>Path HKLM:\\Software\\Policies\\Microsoft\\Windows\\WinRM\\Service <span class="token operator">-</span>Name AllowUnencryptedTraffic <span class="token operator">-</span>Value 1</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Create a new WinRM listener and configure</span></span>
<span class="line">winrm create winrm/config/listener?Address=<span class="token operator">*</span><span class="token operator">+</span>Transport=HTTP</span>
<span class="line">winrm <span class="token function">set</span> winrm/config/winrs <span class="token string">&#39;@{MaxMemoryPerShellMB=&quot;0&quot;}&#39;</span></span>
<span class="line">winrm <span class="token function">set</span> winrm/config <span class="token string">&#39;@{MaxTimeoutms=&quot;7200000&quot;}&#39;</span></span>
<span class="line">winrm <span class="token function">set</span> winrm/config/service <span class="token string">&#39;@{AllowUnencrypted=&quot;true&quot;}&#39;</span></span>
<span class="line">winrm <span class="token function">set</span> winrm/config/service <span class="token string">&#39;@{MaxConcurrentOperationsPerUser=&quot;12000&quot;}&#39;</span></span>
<span class="line">winrm <span class="token function">set</span> winrm/config/service/auth <span class="token string">&#39;@{Basic=&quot;true&quot;}&#39;</span></span>
<span class="line">winrm <span class="token function">set</span> winrm/config/client/auth <span class="token string">&#39;@{Basic=&quot;true&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Configure UAC to allow privilege elevation in remote shells</span></span>
<span class="line"><span class="token variable">$Key</span> = <span class="token string">&#39;HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System&#39;</span></span>
<span class="line"><span class="token variable">$Setting</span> = <span class="token string">&#39;LocalAccountTokenFilterPolicy&#39;</span></span>
<span class="line"><span class="token function">Set-ItemProperty</span> <span class="token operator">-</span>Path <span class="token variable">$Key</span> <span class="token operator">-</span>Name <span class="token variable">$Setting</span> <span class="token operator">-</span>Value 1 <span class="token operator">-</span>Force</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Configure and restart the WinRM Service; Enable the required firewall exception</span></span>
<span class="line"><span class="token function">Stop-Service</span> <span class="token operator">-</span>Name WinRM</span>
<span class="line"><span class="token function">Set-Service</span> <span class="token operator">-</span>Name WinRM <span class="token operator">-</span>StartupType Automatic</span>
<span class="line">netsh advfirewall firewall <span class="token function">set</span> rule name=<span class="token string">&quot;Windows Remote Management (HTTP-In)&quot;</span> new action=allow localip=any remoteip=any</span>
<span class="line"><span class="token function">Start-Service</span> <span class="token operator">-</span>Name WinRM</span>
<span class="line">&lt;<span class="token operator">/</span>powershell&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),l=[t];function o(i,c){return s(),a("div",null,l)}const d=n(p,[["render",o],["__file","aws-windows.html.vue"]]),k=JSON.parse(`{"path":"/04-HashiCorp/01-Packer/05-SamplePkr/aws-windows.html","title":"AWS Packer Sample - Windows","lang":"ko-KR","frontmatter":{"description":"Packer Sample","tag":["Packer","Sample","aws"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/01-Packer/05-SamplePkr/aws-windows.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"AWS Packer Sample - Windows"}],["meta",{"property":"og:description","content":"Packer Sample"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Packer"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:tag","content":"aws"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"AWS Packer Sample - Windows\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"windows.pkr.hcl","slug":"windows-pkr-hcl","link":"#windows-pkr-hcl","children":[]},{"level":2,"title":"bootstrap_win.txt","slug":"bootstrap-win-txt","link":"#bootstrap-win-txt","children":[]}],"git":{"createdTime":1639995661000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":9.18,"words":551},"filePathRelative":"04-HashiCorp/01-Packer/05-SamplePkr/aws-windows.md","localizedDate":"2021년 12월 20일","excerpt":"\\n<blockquote>\\n<p>참고 : <a href=\\"https://learn.hashicorp.com/tutorials/packer/aws-windows-image?in=packer/integrations\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Build a Windows Image</a></p>\\n</blockquote>\\n<h2>windows.pkr.hcl</h2>\\n<div class=\\"language-hcl\\" data-highlighter=\\"prismjs\\" data-ext=\\"hcl\\" data-title=\\"hcl\\"><pre class=\\"language-hcl\\"><code><span class=\\"line\\"><span class=\\"token keyword\\">variable<span class=\\"token type variable\\"> \\"region\\" </span></span><span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">default</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"ap-northeast-2\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">variable<span class=\\"token type variable\\"> \\"cni-version\\" </span></span><span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">default</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"1.0.1\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">locals</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">nomad_url</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"https://releases.hashicorp.com/nomad/1.2.3/nomad_1.2.3_windows_amd64.zip\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">consul_url</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"https://releases.hashicorp.com/consul/1.11.1/consul_1.11.1_windows_amd64.zip\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">jre_url</span>    <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.13%2B8/OpenJDK11U-jre_x64_windows_hotspot_11.0.13_8.zip\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">packer</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token keyword\\">required_plugins</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">amazon</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">version</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"&gt;= 0.0.2\\"</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">source</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"github.com/hashicorp/amazon\\"</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">  <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">source <span class=\\"token string\\">\\"amazon-ebs\\"</span> <span class=\\"token string\\">\\"example\\"</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">ami_name</span>      <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"gs_demo_windows_{{timestamp}}\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">communicator</span>  <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"winrm\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">instance_type</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"t2.micro\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">region</span>        <span class=\\"token punctuation\\">=</span> var.region</span>\\n<span class=\\"line\\">  <span class=\\"token keyword\\">source_ami_filter</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">filters</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">name</span>                <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"*Windows_Server-2019-English-Full-Base*\\"</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">root-device-type</span>    <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"ebs\\"</span></span>\\n<span class=\\"line\\">      <span class=\\"token property\\">virtualization-type</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"hvm\\"</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">most_recent</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token boolean\\">true</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">owners</span>      <span class=\\"token punctuation\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"amazon\\"</span><span class=\\"token punctuation\\">]</span></span>\\n<span class=\\"line\\">  <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">user_data_file</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"./bootstrap_win.txt\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">winrm_password</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"SuperS3cr3t!!!!\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">winrm_username</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token string\\">\\"Administrator\\"</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token keyword\\">build</span> <span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">  <span class=\\"token property\\">sources</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"source.amazon-ebs.example\\"</span><span class=\\"token punctuation\\">]</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">  <span class=\\"token keyword\\">provisioner<span class=\\"token type variable\\"> \\"powershell\\" </span></span><span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">inline</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token punctuation\\">[</span></span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\temp\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">]</span></span>\\n<span class=\\"line\\">  <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">// provisioner \\"file\\" {</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">//   source = \\"./file/\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">//   destination = \\"/tmp\\"</span></span>\\n<span class=\\"line\\">  <span class=\\"token comment\\">// }</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">  <span class=\\"token keyword\\">provisioner<span class=\\"token type variable\\"> \\"powershell\\" </span></span><span class=\\"token punctuation\\">{</span></span>\\n<span class=\\"line\\">    <span class=\\"token property\\">inline</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token punctuation\\">[</span></span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\jre\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\consul\\\\\\\\bin\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\consul\\\\\\\\data\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\consul\\\\\\\\conf\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\nomad\\\\\\\\bin\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\nomad\\\\\\\\data\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"New-Item \\\\\\"C:\\\\\\\\hashicorp\\\\\\\\nomad\\\\\\\\conf\\\\\\\\\\\\\\" -ItemType Directory\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"Invoke-WebRequest -Uri <span class=\\"token interpolation\\"><span class=\\"token punctuation\\">$</span><span class=\\"token punctuation\\">{</span><span class=\\"token keyword\\">local</span><span class=\\"token punctuation\\">.</span><span class=\\"token type variable\\">jre_url</span><span class=\\"token punctuation\\">}</span></span> -OutFile $env:TEMP\\\\\\\\jre.zip\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"Invoke-WebRequest -Uri <span class=\\"token interpolation\\"><span class=\\"token punctuation\\">$</span><span class=\\"token punctuation\\">{</span><span class=\\"token keyword\\">local</span><span class=\\"token punctuation\\">.</span><span class=\\"token type variable\\">consul_url</span><span class=\\"token punctuation\\">}</span></span> -OutFile $env:TEMP\\\\\\\\consul.zip\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"Invoke-WebRequest -Uri <span class=\\"token interpolation\\"><span class=\\"token punctuation\\">$</span><span class=\\"token punctuation\\">{</span><span class=\\"token keyword\\">local</span><span class=\\"token punctuation\\">.</span><span class=\\"token type variable\\">nomad_url</span><span class=\\"token punctuation\\">}</span></span> -OutFile $env:TEMP\\\\\\\\nomad.zip\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"Expand-Archive $env:TEMP\\\\\\\\jre.zip -DestinationPath C:\\\\\\\\hashicorp\\\\\\\\jre\\\\\\\\\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"Expand-Archive $env:TEMP\\\\\\\\consul.zip -DestinationPath C:\\\\\\\\hashicorp\\\\\\\\consul\\\\\\\\bin\\\\\\\\\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"Expand-Archive $env:TEMP\\\\\\\\nomad.zip -DestinationPath C:\\\\\\\\hashicorp\\\\\\\\nomad\\\\\\\\bin\\\\\\\\\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token string\\">\\"[Environment]::SetEnvironmentVariable(\\\\\\"Path\\\\\\", $env:Path + \\\\\\";C:\\\\\\\\hashicorp\\\\\\\\jre\\\\\\\\jdk-11.0.13+8-jre\\\\\\\\bin;C:\\\\\\\\hashicorp\\\\\\\\nomad\\\\\\\\bin;C:\\\\\\\\hashicorp\\\\\\\\consul\\\\\\\\bin\\\\\\", \\\\\\"Machine\\\\\\")\\"</span>,</span>\\n<span class=\\"line\\">      <span class=\\"token comment\\">// \\"$old = (Get-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\\\\\\\\System\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Session Manager\\\\\\\\Environment' -Name path).path\\",</span></span>\\n<span class=\\"line\\">      <span class=\\"token comment\\">// \\"$new = \\\\\\"$old;C:\\\\\\\\hashicorp\\\\\\\\jre\\\\\\\\jdk-11.0.13+8-jre\\\\\\\\bin;C:\\\\\\\\hashicorp\\\\\\\\nomad\\\\\\\\bin;C:\\\\\\\\hashicorp\\\\\\\\consul\\\\\\\\bin\\\\\\"\\",</span></span>\\n<span class=\\"line\\">      <span class=\\"token comment\\">// \\"Set-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\\\\\\\\System\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Session Manager\\\\\\\\Environment' -Name path -Value $new\\",</span></span>\\n<span class=\\"line\\">    <span class=\\"token punctuation\\">]</span></span>\\n<span class=\\"line\\">  <span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"><span class=\\"token punctuation\\">}</span></span>\\n<span class=\\"line\\"></span></code></pre></div>"}`);export{d as comp,k as data};