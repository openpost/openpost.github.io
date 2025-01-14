import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as p}from"./app-DhMJQ1_3.js";const e={},t=p(`<h1 id="configure-boudary-using-terraform" tabindex="-1"><a class="header-anchor" href="#configure-boudary-using-terraform"><span>Configure Boudary using Terraform</span></a></h1><ul><li>Terraform provider : <a href="https://registry.terraform.io/providers/hashicorp/boundary/latest/docs" target="_blank" rel="noopener noreferrer">https://registry.terraform.io/providers/hashicorp/boundary/latest/docs</a></li><li>learn site : <a href="https://learn.hashicorp.com/tutorials/boundary/getting-started-config" target="_blank" rel="noopener noreferrer">https://learn.hashicorp.com/tutorials/boundary/getting-started-config</a></li></ul><h2 id="main-tf" tabindex="-1"><a class="header-anchor" href="#main-tf"><span><a href="http://main.tf" target="_blank" rel="noopener noreferrer">main.tf</a></span></a></h2><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">provider<span class="token type variable"> &quot;boundary&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">addr</span>             <span class="token punctuation">=</span> <span class="token string">&quot;http://172.28.128.11:9200&quot;</span></span>
<span class="line"><span class="token comment">//   recovery_kms_hcl = &lt;&lt;EOT</span></span>
<span class="line"><span class="token comment">// kms &quot;aead&quot; {</span></span>
<span class="line"><span class="token comment">//     purpose   = &quot;recovery&quot;</span></span>
<span class="line"><span class="token comment">//     aead_type = &quot;aes-gcm&quot;</span></span>
<span class="line"><span class="token comment">//     key       = &quot;8fZBjCUfN0TzjEGLQldGY4+iE9AkOvCfjh7+p0GtRBQ=&quot;</span></span>
<span class="line"><span class="token comment">//     key_id    = &quot;global_recovery&quot;</span></span>
<span class="line"><span class="token comment">// }</span></span>
<span class="line"><span class="token comment">// EOT</span></span>
<span class="line">    <span class="token property">auth_method_id</span> <span class="token punctuation">=</span> <span class="token string">&quot;ampw_U6FXouWRDK&quot;</span></span>
<span class="line">    <span class="token property">password_auth_method_login_name</span> <span class="token punctuation">=</span> <span class="token string">&quot;admin&quot;</span></span>
<span class="line">    <span class="token property">password_auth_method_password</span> <span class="token punctuation">=</span> <span class="token string">&quot;POByMKtvabYS1wtRHLgZ&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_scope&quot;</span></span> <span class="token string">&quot;global&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">global_scope</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">scope_id</span>     <span class="token punctuation">=</span> <span class="token string">&quot;global&quot;</span></span>
<span class="line">  <span class="token property">description</span>  <span class="token punctuation">=</span> <span class="token string">&quot;Global scope&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Scope HashiStack</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_scope&quot;</span></span> <span class="token string">&quot;corp&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>                     <span class="token punctuation">=</span> <span class="token string">&quot;hashistack&quot;</span></span>
<span class="line">  <span class="token property">description</span>              <span class="token punctuation">=</span> <span class="token string">&quot;hashistack scope&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>                 <span class="token punctuation">=</span> boundary_scope.global.id</span>
<span class="line">  <span class="token property">auto_create_admin_role</span>   <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token property">auto_create_default_role</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_auth_method&quot;</span></span> <span class="token string">&quot;corp_password&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> <span class="token string">&quot;corp_password_auth_method&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;Password auth method&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>    <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_account&quot;</span></span> <span class="token string">&quot;user&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">for_each</span>       <span class="token punctuation">=</span> var.users</span>
<span class="line">  <span class="token property">name</span>           <span class="token punctuation">=</span> each.key</span>
<span class="line">  <span class="token property">description</span>    <span class="token punctuation">=</span> <span class="token string">&quot;User account for my user&quot;</span></span>
<span class="line">  <span class="token property">type</span>           <span class="token punctuation">=</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">  <span class="token property">login_name</span>     <span class="token punctuation">=</span> lower(each.key)</span>
<span class="line">  <span class="token property">password</span>       <span class="token punctuation">=</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">  <span class="token property">auth_method_id</span> <span class="token punctuation">=</span> boundary_auth_method.corp_password.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_user&quot;</span></span> <span class="token string">&quot;users&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">for_each</span>    <span class="token punctuation">=</span> var.users</span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> each.key</span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;User resource for <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>each<span class="token punctuation">.</span>key<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">  <span class="token property">account_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>boundary_account<span class="token punctuation">.</span>user<span class="token punctuation">[</span>each<span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span>id<span class="token punctuation">}</span></span>&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">scope_id</span> <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_group&quot;</span></span> <span class="token string">&quot;admin&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> <span class="token string">&quot;admin&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;Organization group for readonly users&quot;</span></span>
<span class="line">  <span class="token property">member_ids</span>  <span class="token punctuation">=</span> <span class="token punctuation">[</span>for user in boundary_user.users : user.id<span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">scope_id</span>    <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_user&quot;</span></span> <span class="token string">&quot;readonly_users&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">for_each</span>    <span class="token punctuation">=</span> var.readonly_users</span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> each.key</span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;User resource for <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>each<span class="token punctuation">.</span>key<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>    <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_group&quot;</span></span> <span class="token string">&quot;readonly&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> <span class="token string">&quot;read-only&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;Organization group for readonly users&quot;</span></span>
<span class="line">  <span class="token property">member_ids</span>  <span class="token punctuation">=</span> <span class="token punctuation">[</span>for user in boundary_user.readonly_users : user.id<span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">scope_id</span>    <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_role&quot;</span></span> <span class="token string">&quot;corp_admin&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> <span class="token string">&quot;corp_admin&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;Corp Administrator role&quot;</span></span>
<span class="line">  <span class="token property">principal_ids</span> <span class="token punctuation">=</span> concat(</span>
<span class="line">    <span class="token punctuation">[</span>for user in boundary_user.users: user.id<span class="token punctuation">]</span></span>
<span class="line">  )</span>
<span class="line">  <span class="token property">grant_strings</span>   <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;id=*;type=*;actions=create,read,update,delete&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">scope_id</span> <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_role&quot;</span></span> <span class="token string">&quot;organization_readonly&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> <span class="token string">&quot;Read-only&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;Read-only role&quot;</span></span>
<span class="line">  <span class="token property">principal_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>boundary_group.readonly.id<span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">grant_strings</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;id=*;type=*;actions=read&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">scope_id</span>    <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_scope&quot;</span></span> <span class="token string">&quot;core_infra&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>                   <span class="token punctuation">=</span> <span class="token string">&quot;core_infra&quot;</span></span>
<span class="line">  <span class="token property">description</span>            <span class="token punctuation">=</span> <span class="token string">&quot;My first project!&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>               <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line">  <span class="token property">auto_create_admin_role</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_host_catalog&quot;</span></span> <span class="token string">&quot;backend_servers&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span>        <span class="token punctuation">=</span> <span class="token string">&quot;backend_servers&quot;</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;Backend servers host catalog&quot;</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> <span class="token string">&quot;static&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>    <span class="token punctuation">=</span> boundary_scope.core_infra.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_host&quot;</span></span> <span class="token string">&quot;ssh_servers&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">for_each</span>        <span class="token punctuation">=</span> var.ssh_server_ips</span>
<span class="line">  <span class="token property">type</span>            <span class="token punctuation">=</span> <span class="token string">&quot;static&quot;</span></span>
<span class="line">  <span class="token property">name</span>            <span class="token punctuation">=</span> <span class="token string">&quot;ssh_server_service_<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>each<span class="token punctuation">.</span>value<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">  <span class="token property">description</span>     <span class="token punctuation">=</span> <span class="token string">&quot;ssh server host&quot;</span></span>
<span class="line">  <span class="token property">address</span>         <span class="token punctuation">=</span> each.key</span>
<span class="line">  <span class="token property">host_catalog_id</span> <span class="token punctuation">=</span> boundary_host_catalog.backend_servers.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_host&quot;</span></span> <span class="token string">&quot;backend_servers&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">for_each</span>        <span class="token punctuation">=</span> var.backend_server_ips</span>
<span class="line">  <span class="token property">type</span>            <span class="token punctuation">=</span> <span class="token string">&quot;static&quot;</span></span>
<span class="line">  <span class="token property">name</span>            <span class="token punctuation">=</span> <span class="token string">&quot;backend_server_service_<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>each<span class="token punctuation">.</span>value<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line">  <span class="token property">description</span>     <span class="token punctuation">=</span> <span class="token string">&quot;Backend server host&quot;</span></span>
<span class="line">  <span class="token property">address</span>         <span class="token punctuation">=</span> each.key</span>
<span class="line">  <span class="token property">host_catalog_id</span> <span class="token punctuation">=</span> boundary_host_catalog.backend_servers.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_host_set&quot;</span></span> <span class="token string">&quot;ssh_servers&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span>            <span class="token punctuation">=</span> <span class="token string">&quot;static&quot;</span></span>
<span class="line">  <span class="token property">name</span>            <span class="token punctuation">=</span> <span class="token string">&quot;ssh_servers&quot;</span></span>
<span class="line">  <span class="token property">description</span>     <span class="token punctuation">=</span> <span class="token string">&quot;Host set for ssh servers&quot;</span></span>
<span class="line">  <span class="token property">host_catalog_id</span> <span class="token punctuation">=</span> boundary_host_catalog.backend_servers.id</span>
<span class="line">  <span class="token property">host_ids</span>        <span class="token punctuation">=</span> <span class="token punctuation">[</span>for host in boundary_host.ssh_servers : host.id<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_host_set&quot;</span></span> <span class="token string">&quot;backend_servers&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span>            <span class="token punctuation">=</span> <span class="token string">&quot;static&quot;</span></span>
<span class="line">  <span class="token property">name</span>            <span class="token punctuation">=</span> <span class="token string">&quot;backend_servers&quot;</span></span>
<span class="line">  <span class="token property">description</span>     <span class="token punctuation">=</span> <span class="token string">&quot;Host set for backend servers&quot;</span></span>
<span class="line">  <span class="token property">host_catalog_id</span> <span class="token punctuation">=</span> boundary_host_catalog.backend_servers.id</span>
<span class="line">  <span class="token property">host_ids</span>        <span class="token punctuation">=</span> <span class="token punctuation">[</span>for host in boundary_host.backend_servers : host.id<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># create target for accessing backend servers on port :8000</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_target&quot;</span></span> <span class="token string">&quot;backend_servers_service&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span>         <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">  <span class="token property">name</span>         <span class="token punctuation">=</span> <span class="token string">&quot;backend_server&quot;</span></span>
<span class="line">  <span class="token property">description</span>  <span class="token punctuation">=</span> <span class="token string">&quot;Backend service target&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>     <span class="token punctuation">=</span> boundary_scope.core_infra.id</span>
<span class="line">  <span class="token property">default_port</span> <span class="token punctuation">=</span> <span class="token string">&quot;8080&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">host_set_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    boundary_host_set.backend_servers .id</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># create target for accessing backend servers on port :22</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_target&quot;</span></span> <span class="token string">&quot;backend_servers_ssh&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span>         <span class="token punctuation">=</span> <span class="token string">&quot;tcp&quot;</span></span>
<span class="line">  <span class="token property">name</span>         <span class="token punctuation">=</span> <span class="token string">&quot;ssh_server&quot;</span></span>
<span class="line">  <span class="token property">description</span>  <span class="token punctuation">=</span> <span class="token string">&quot;Backend SSH target&quot;</span></span>
<span class="line">  <span class="token property">scope_id</span>     <span class="token punctuation">=</span> boundary_scope.core_infra.id</span>
<span class="line">  <span class="token comment">// default_port = &quot;22&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">host_set_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    boundary_host_set.ssh_servers.id</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// anonymous</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_role&quot;</span></span> <span class="token string">&quot;global_anon_listing&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">scope_id</span> <span class="token punctuation">=</span> boundary_scope.global.id</span>
<span class="line">  <span class="token property">grant_strings</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;id=*;type=auth-method;actions=list,authenticate&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;type=scope;actions=list&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;id={{account.id}};actions=read,change-password&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">principal_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;u_anon&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;boundary_role&quot;</span></span> <span class="token string">&quot;org_anon_listing&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">scope_id</span> <span class="token punctuation">=</span> boundary_scope.corp.id</span>
<span class="line">  <span class="token property">grant_strings</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;id=*;type=auth-method;actions=list,authenticate&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;type=scope;actions=list&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;id={{account.id}};actions=read,change-password&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">principal_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;u_anon&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">output<span class="token type variable"> &quot;corp_auth_method_id&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">value</span> <span class="token punctuation">=</span> <span class="token string">&quot;boundary authenticate password -auth-method-id <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>boundary_auth_method<span class="token punctuation">.</span>corp_password<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span> -login-name <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>boundary_account<span class="token punctuation">.</span>user<span class="token punctuation">[</span><span class="token string">&quot;gslee&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>login_name<span class="token punctuation">}</span></span> -password <span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>boundary_account<span class="token punctuation">.</span>user<span class="token punctuation">[</span><span class="token string">&quot;gslee&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>password<span class="token punctuation">}</span></span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="variable-tf" tabindex="-1"><a class="header-anchor" href="#variable-tf"><span><a href="http://variable.tf" target="_blank" rel="noopener noreferrer">variable.tf</a></span></a></h2><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;addr&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token string">&quot;http://172.28.128.11:9200&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;users&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> set(string)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;gslee&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Jim&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Mike&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Todd&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Jeff&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Randy&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Susmitha&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;readonly_users&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> set(string)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;Chris&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Pete&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;Justin&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;ssh_server_ips&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> set(string)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;172.28.128.11&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> &quot;backend_server_ips&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> set(string)</span>
<span class="line">  <span class="token property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;172.28.128.11&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;172.28.128.50&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;172.28.128.60&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;172.28.128.61&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;172.28.128.70&quot;</span>,</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[t];function l(i,c){return n(),a("div",null,o)}const d=s(e,[["render",l],["__file","BoundaryTerraformSample01.html.vue"]]),k=JSON.parse('{"path":"/04-HashiCorp/05-Boundary/02-Config/BoundaryTerraformSample01.html","title":"Configure Boudary using Terraform","lang":"ko-KR","frontmatter":{"description":"Boundary Terraform Setup","tag":["Boundary","Terraform","Config"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/05-Boundary/02-Config/BoundaryTerraformSample01.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Configure Boudary using Terraform"}],["meta",{"property":"og:description","content":"Boundary Terraform Setup"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Boundary"}],["meta",{"property":"article:tag","content":"Terraform"}],["meta",{"property":"article:tag","content":"Config"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Configure Boudary using Terraform\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"main.tf","slug":"main-tf","link":"#main-tf","children":[]},{"level":2,"title":"variable.tf","slug":"variable-tf","link":"#variable-tf","children":[]}],"git":{"createdTime":1634219407000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":8.6,"words":516},"filePathRelative":"04-HashiCorp/05-Boundary/02-Config/BoundaryTerraformSample01.md","localizedDate":"2021년 10월 14일","excerpt":"\\n<ul>\\n<li>Terraform provider : <a href=\\"https://registry.terraform.io/providers/hashicorp/boundary/latest/docs\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://registry.terraform.io/providers/hashicorp/boundary/latest/docs</a></li>\\n<li>learn site : <a href=\\"https://learn.hashicorp.com/tutorials/boundary/getting-started-config\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://learn.hashicorp.com/tutorials/boundary/getting-started-config</a></li>\\n</ul>"}');export{d as comp,k as data};
