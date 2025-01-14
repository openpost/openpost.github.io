import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const p={},l=e(`<h1 id="boundary-install-on-consul-nomad" tabindex="-1"><a class="header-anchor" href="#boundary-install-on-consul-nomad"><span>Boundary Install on Consul-Nomad</span></a></h1><h2 id="_1-nomad-namespace-create" tabindex="-1"><a class="header-anchor" href="#_1-nomad-namespace-create"><span>1. Nomad namespace create</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">nomad namespace apply <span class="token parameter variable">-description</span> <span class="token string">&quot;Boundary&quot;</span> boundary</span>
<span class="line"></span></code></pre></div><h2 id="_2-postgresql-setup" tabindex="-1"><a class="header-anchor" href="#_2-postgresql-setup"><span>2. Postgresql setup</span></a></h2><h3 id="_2-1-postgresql-job-run" tabindex="-1"><a class="header-anchor" href="#_2-1-postgresql-job-run"><span>2.1 Postgresql job run</span></a></h3><details class="hint-container details"><summary>postgresql.nomad</summary><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;postgresql&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;hashistack&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;boundary&quot;</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;postgres&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    volume <span class="token string">&quot;postgres-vol&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">      <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgres-vol&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;db&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">volume_mount</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">volume</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgres-vol&quot;</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/var/lib/postgresql/data&quot;</span></span>
<span class="line">        <span class="token property">read_only</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgres:13.2&quot;</span></span>
<span class="line">        <span class="token keyword">port_map</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">pg</span> <span class="token punctuation">=</span> <span class="token number">5432</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      </span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">POSTGRES_PASSWORD</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgres&quot;</span></span>
<span class="line">        <span class="token property">POSTGRES_USER</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgres&quot;</span></span>
<span class="line">        <span class="token property">PGDATA</span> <span class="token punctuation">=</span> <span class="token string">&quot;/var/lib/postgresql/data/pgdata&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">1024</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">          port <span class="token string">&quot;pg&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">5432</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgresql&quot;</span></span>
<span class="line">        <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;db&quot;</span>, <span class="token string">&quot;boundary&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;pg&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">type</span>  <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">          <span class="token property">port</span>  <span class="token punctuation">=</span> <span class="token string">&quot;pg&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">nomad job run <span class="token parameter variable">-namespace</span><span class="token operator">=</span><span class="token string">&quot;boundary&quot;</span> postgresql.nomad</span>
<span class="line"></span></code></pre></div><h3 id="_2-2-posgresql-init" tabindex="-1"><a class="header-anchor" href="#_2-2-posgresql-init"><span>2.2 Posgresql init</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># Login</span></span>
<span class="line">psql <span class="token parameter variable">-h</span> <span class="token number">172.28</span>.128.11 <span class="token parameter variable">-U</span> postgres postgres</span>
<span class="line"></span></code></pre></div><div class="language-sql" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="line"><span class="token comment"># &lt;enter the password&gt; postgres</span></span>
<span class="line"><span class="token keyword">CREATE</span> ROLE boundary <span class="token keyword">WITH</span> LOGIN PASSWORD <span class="token string">&#39;PASSWORD&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> boundary OWNER boundary<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token keyword">DATABASE</span> boundary <span class="token keyword">TO</span> boundary<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">USER</span> boundary PASSWORD <span class="token string">&#39;boundary&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="_3-boundary-database-init" tabindex="-1"><a class="header-anchor" href="#_3-boundary-database-init"><span>3. Boundary database init</span></a></h2><h3 id="_3-1-create-config-file" tabindex="-1"><a class="header-anchor" href="#_3-1-create-config-file"><span>3.1 Create config file</span></a></h3><p>&lt;/tmp/config.hcl&gt;</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token property">disable_mlock</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">controller</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;controller-0&quot;</span></span>
<span class="line">  <span class="token keyword">database</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">url</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgresql://boundary:boundary@172.28.128.11:5432/boundary?sslmode=disable&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">kms <span class="token string">&quot;aead&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">purpose</span> <span class="token punctuation">=</span> <span class="token string">&quot;root&quot;</span></span>
<span class="line">  <span class="token property">aead_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;aes-gcm&quot;</span></span>
<span class="line">  <span class="token property">key</span> <span class="token punctuation">=</span> <span class="token string">&quot;sP1fnF5Xz85RrXyELHFeZg9Ad2qt4Z4bgNHVGtD6ung=&quot;</span></span>
<span class="line">  <span class="token property">key_id</span> <span class="token punctuation">=</span> <span class="token string">&quot;global_root&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">kms <span class="token string">&quot;aead&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">purpose</span> <span class="token punctuation">=</span> <span class="token string">&quot;worker-auth&quot;</span></span>
<span class="line">  <span class="token property">aead_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;aes-gcm&quot;</span></span>
<span class="line">  <span class="token property">key</span> <span class="token punctuation">=</span> <span class="token string">&quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span></span>
<span class="line">  <span class="token property">key_id</span> <span class="token punctuation">=</span> <span class="token string">&quot;global_worker-auth&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">kms <span class="token string">&quot;aead&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">purpose</span>   <span class="token punctuation">=</span> <span class="token string">&quot;recovery&quot;</span></span>
<span class="line">    <span class="token property">aead_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;aes-gcm&quot;</span></span>
<span class="line">    <span class="token property">key</span>       <span class="token punctuation">=</span> <span class="token string">&quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span></span>
<span class="line">    <span class="token property">key_id</span>    <span class="token punctuation">=</span> <span class="token string">&quot;global_recovery&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-init-database" tabindex="-1"><a class="header-anchor" href="#_3-2-init-database"><span>3.2 Init database</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">boundary database init <span class="token parameter variable">-config</span><span class="token operator">=</span>/tmp/config.hcl</span>
<span class="line"></span></code></pre></div><h2 id="_4-boundary-job" tabindex="-1"><a class="header-anchor" href="#_4-boundary-job"><span>4. Boundary Job</span></a></h2><h3 id="_4-1-boundary-controller-job" tabindex="-1"><a class="header-anchor" href="#_4-1-boundary-controller-job"><span>4.1 Boundary Controller Job</span></a></h3><details class="hint-container details"><summary>boundary-controller.nomad</summary><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.6.2&quot;</span></span>
<span class="line">  <span class="token property">postgre_ip</span> <span class="token punctuation">=</span> <span class="token string">&quot;172.28.128.11&quot;</span></span>
<span class="line">  <span class="token property">postgre_port</span> <span class="token punctuation">=</span> <span class="token string">&quot;5432&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;boundary-controller&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;hashistack&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;boundary&quot;</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;controller&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;migration&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;raw_exec&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">BOUNDARY_POSTGRES_URL</span> <span class="token punctuation">=</span> <span class="token string">&quot;postgresql://boundary:boundary@<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">postgre_ip</span><span class="token punctuation">}</span></span>:<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">postgre_port</span><span class="token punctuation">}</span></span>/boundary?sslmode=disable&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">artifact</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://releases.hashicorp.com/boundary/<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>/boundary_<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>_linux_amd64.zip&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOH</span>
<span class="line">disable_mlock = true</span>
<span class="line"></span>
<span class="line">{{ range service &quot;postgresql&quot; }}</span>
<span class="line">controller {</span>
<span class="line">  name = &quot;controller-0&quot;</span>
<span class="line">  database {</span>
<span class="line">    url = &quot;postgresql://boundary:boundary@{{ .Address }}:{{ .Port }}/boundary?sslmode=disable&quot;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">{{ end }}</span>
<span class="line"></span>
<span class="line">listener &quot;tcp&quot; {</span>
<span class="line">  address = &quot;0.0.0.0:9200&quot;</span>
<span class="line">  purpose = &quot;api&quot;</span>
<span class="line">  tls_disable = true</span>
<span class="line">}</span>
<span class="line">listener &quot;tcp&quot; {</span>
<span class="line">  address = &quot;0.0.0.0:9201&quot;</span>
<span class="line">  purpose = &quot;cluster&quot;</span>
<span class="line">  tls_disable = true</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose = &quot;root&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key = &quot;sP1fnF5Xz85RrXyELHFeZg9Ad2qt4Z4bgNHVGtD6ung=&quot;</span>
<span class="line">  key_id = &quot;global_root&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose = &quot;worker-auth&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span>
<span class="line">  key_id = &quot;global_worker-auth&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">    purpose   = &quot;recovery&quot;</span>
<span class="line">    aead_type = &quot;aes-gcm&quot;</span>
<span class="line">    key       = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span>
<span class="line">    key_id    = &quot;global_recovery&quot;</span>
<span class="line">}</span>
<span class="line">EOH</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/config/config.hcl&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">command</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/boundary&quot;</span></span>
<span class="line">        <span class="token property">args</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;database&quot;</span>, <span class="token string">&quot;migrate&quot;</span>, <span class="token string">&quot;-config&quot;</span>, <span class="token string">&quot;local/config/config.hcl&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">lifecycle</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">hook</span>    <span class="token punctuation">=</span> <span class="token string">&quot;prestart&quot;</span></span>
<span class="line">        <span class="token property">sidecar</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;controller&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;hashicorp/boundary:<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">        <span class="token keyword">port_map</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">controller</span> <span class="token punctuation">=</span> <span class="token number">9200</span></span>
<span class="line">          <span class="token property">cluster</span> <span class="token punctuation">=</span> <span class="token number">9201</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">mount</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">type</span>   <span class="token punctuation">=</span> <span class="token string">&quot;bind&quot;</span></span>
<span class="line">          <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/config&quot;</span></span>
<span class="line">          <span class="token property">target</span> <span class="token punctuation">=</span> <span class="token string">&quot;/boundary&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// network_mode = &quot;boundary-net&quot;</span></span>
<span class="line">        <span class="token comment">// network_aliases = [</span></span>
<span class="line">        <span class="token comment">//   &quot;boundary-controller&quot;</span></span>
<span class="line">        <span class="token comment">// ]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      </span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOH</span>
<span class="line">disable_mlock = true</span>
<span class="line"></span>
<span class="line">{{ range service &quot;postgresql&quot; }}</span>
<span class="line">controller {</span>
<span class="line">  name = &quot;controller-0&quot;</span>
<span class="line">  database {</span>
<span class="line">    url = &quot;postgresql://boundary:boundary@{{ .Address }}:{{ .Port }}/boundary?sslmode=disable&quot;</span>
<span class="line">  }</span>
<span class="line">  public_cluster_addr = &quot;{{ env &quot;NOMAD_ADDR_cluster&quot; }}&quot;</span>
<span class="line">}</span>
<span class="line">{{ end }}</span>
<span class="line"></span>
<span class="line">listener &quot;tcp&quot; {</span>
<span class="line">  address = &quot;0.0.0.0:9200&quot;</span>
<span class="line">  purpose = &quot;api&quot;</span>
<span class="line">  tls_disable = true</span>
<span class="line">}</span>
<span class="line">listener &quot;tcp&quot; {</span>
<span class="line">  address = &quot;0.0.0.0:9201&quot;</span>
<span class="line">  purpose = &quot;cluster&quot;</span>
<span class="line">  tls_disable = true</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose = &quot;root&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key = &quot;sP1fnF5Xz85RrXyELHFeZg9Ad2qt4Z4bgNHVGtD6ung=&quot;</span>
<span class="line">  key_id = &quot;global_root&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose = &quot;worker-auth&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span>
<span class="line">  key_id = &quot;global_worker-auth&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">    purpose   = &quot;recovery&quot;</span>
<span class="line">    aead_type = &quot;aes-gcm&quot;</span>
<span class="line">    key       = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span>
<span class="line">    key_id    = &quot;global_recovery&quot;</span>
<span class="line">}</span>
<span class="line">EOH</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;local/config/config.hcl&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      </span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// BOUNDARY_POSTGRES_URL = &quot;postgresql://boundary:boundary@\${local.postgre_ip}:\${local.postgre_port}/boundary?sslmode=disable&quot;</span></span>
<span class="line">        <span class="token property">SKIP_SETCAP</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">cpu</span>    <span class="token punctuation">=</span> <span class="token number">300</span></span>
<span class="line">        <span class="token property">memory</span> <span class="token punctuation">=</span> <span class="token number">500</span></span>
<span class="line">        <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">          port <span class="token string">&quot;controller&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">9200</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">          port <span class="token string">&quot;cluster&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">9201</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;boundary&quot;</span></span>
<span class="line">        <span class="token property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;cluster&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;cluster&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">check</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">type</span>  <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">          <span class="token property">interval</span> <span class="token punctuation">=</span> <span class="token string">&quot;10s&quot;</span></span>
<span class="line">          <span class="token property">timeout</span>  <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span></span>
<span class="line">          <span class="token property">port</span>  <span class="token punctuation">=</span> <span class="token string">&quot;cluster&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">nomad job run <span class="token parameter variable">-namespace</span><span class="token operator">=</span><span class="token string">&quot;boundary&quot;</span> boundary-controller.nomad</span>
<span class="line"></span></code></pre></div><h3 id="_4-2-boundary-worker-job" tabindex="-1"><a class="header-anchor" href="#_4-2-boundary-worker-job"><span>4.2 Boundary worker Job</span></a></h3><details class="hint-container details"><summary>boundary-controller.nomad</summary><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">locals</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.6.2&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">job <span class="token string">&quot;boundary-worker&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;service&quot;</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;hashistack&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">namespace</span> <span class="token punctuation">=</span> <span class="token string">&quot;boundary&quot;</span></span>
<span class="line">  </span>
<span class="line">  group <span class="token string">&quot;worker&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">scaling</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">      <span class="token property">min</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">      <span class="token property">max</span> <span class="token punctuation">=</span> <span class="token number">3</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">mode</span> <span class="token punctuation">=</span> <span class="token string">&quot;host&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    task <span class="token string">&quot;worker&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;hashicorp/boundary:<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span><span class="token keyword">local</span><span class="token punctuation">.</span><span class="token type variable">version</span><span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">        <span class="token keyword">port_map</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">proxy</span> <span class="token punctuation">=</span> <span class="token number">9202</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token property">volumes</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;local/boundary:/boundary/&quot;</span>,</span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">        <span class="token comment">// network_mode = &quot;boundary-net&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      </span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOH</span>
<span class="line">disable_mlock = true</span>
<span class="line"></span>
<span class="line">listener &quot;tcp&quot; {</span>
<span class="line">  address = &quot;0.0.0.0:9202&quot;</span>
<span class="line">  purpose = &quot;proxy&quot;</span>
<span class="line">  tls_disable = true</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">worker {</span>
<span class="line">  name = &quot;worker-0&quot;</span>
<span class="line">  controllers = [</span>
<span class="line">{{ range service &quot;boundary&quot; }}</span>
<span class="line">		&quot;{{ .Address }}&quot;,</span>
<span class="line">{{ end }}</span>
<span class="line">  ]</span>
<span class="line">  public_addr = &quot;{{ env &quot;NOMAD_ADDR_proxy&quot; }}&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose = &quot;root&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key = &quot;sP1fnF5Xz85RrXyELHFeZg9Ad2qt4Z4bgNHVGtD6ung=&quot;</span>
<span class="line">  key_id = &quot;global_root&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose = &quot;worker-auth&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span>
<span class="line">  key_id = &quot;global_worker-auth&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">kms &quot;aead&quot; {</span>
<span class="line">  purpose   = &quot;recovery&quot;</span>
<span class="line">  aead_type = &quot;aes-gcm&quot;</span>
<span class="line">  key       = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span>
<span class="line">  key_id    = &quot;global_recovery&quot;</span>
<span class="line">}</span>
<span class="line">EOH</span></span>
<span class="line">        <span class="token property">destination</span> <span class="token punctuation">=</span> <span class="token string">&quot;/local/boundary/config.hcl&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      </span>
<span class="line">      <span class="token keyword">env</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// BOUNDARY_POSTGRES_URL = &quot;postgresql://boundary:boundary@172.28.128.11:5432/boundary?sslmode=disable&quot;</span></span>
<span class="line">        <span class="token property">SKIP_SETCAP</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">resources</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">          port <span class="token string">&quot;proxy&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">nomad job run <span class="token parameter variable">-namespace</span><span class="token operator">=</span><span class="token string">&quot;boundary&quot;</span> boundary-worker.nomad</span>
<span class="line"></span></code></pre></div>`,23),i=[l];function t(o,c){return n(),a("div",null,i)}const d=s(p,[["render",t],["__file","OnConsulNomad.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/05-Boundary/01-Install/OnConsulNomad.html","title":"Boundary Install on Consul-Nomad","lang":"ko-KR","frontmatter":{"description":"Boundary Install","tag":["Boundary","Install"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/05-Boundary/01-Install/OnConsulNomad.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Boundary Install on Consul-Nomad"}],["meta",{"property":"og:description","content":"Boundary Install"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Boundary"}],["meta",{"property":"article:tag","content":"Install"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Boundary Install on Consul-Nomad\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. Nomad namespace create","slug":"_1-nomad-namespace-create","link":"#_1-nomad-namespace-create","children":[]},{"level":2,"title":"2. Postgresql setup","slug":"_2-postgresql-setup","link":"#_2-postgresql-setup","children":[{"level":3,"title":"2.1 Postgresql job run","slug":"_2-1-postgresql-job-run","link":"#_2-1-postgresql-job-run","children":[]},{"level":3,"title":"2.2 Posgresql init","slug":"_2-2-posgresql-init","link":"#_2-2-posgresql-init","children":[]}]},{"level":2,"title":"3. Boundary database init","slug":"_3-boundary-database-init","link":"#_3-boundary-database-init","children":[{"level":3,"title":"3.1 Create config file","slug":"_3-1-create-config-file","link":"#_3-1-create-config-file","children":[]},{"level":3,"title":"3.2 Init database","slug":"_3-2-init-database","link":"#_3-2-init-database","children":[]}]},{"level":2,"title":"4. Boundary Job","slug":"_4-boundary-job","link":"#_4-boundary-job","children":[{"level":3,"title":"4.1 Boundary Controller Job","slug":"_4-1-boundary-controller-job","link":"#_4-1-boundary-controller-job","children":[]},{"level":3,"title":"4.2 Boundary worker Job","slug":"_4-2-boundary-worker-job","link":"#_4-2-boundary-worker-job","children":[]}]}],"git":{"createdTime":1634219407000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":11.47,"words":688},"filePathRelative":"04-HashiCorp/05-Boundary/01-Install/OnConsulNomad.md","localizedDate":"2021년 10월 14일","excerpt":"\\n<h2>1. Nomad namespace create</h2>\\n<div class=\\"language-bash\\" data-highlighter=\\"prismjs\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"line\\">nomad namespace apply <span class=\\"token parameter variable\\">-description</span> <span class=\\"token string\\">\\"Boundary\\"</span> boundary</span>\\n<span class=\\"line\\"></span></code></pre></div>"}');export{d as comp,v as data};
