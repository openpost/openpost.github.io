import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l="/assets/hashicorp-oidc-1-COt_JXG4.png",i="/assets/hashicorp-oidc-2-BG7Yim5g.png",p="/assets/hashicorp-oidc-3-BcChkLQP.png",t="/assets/hashicorp-oidc-4-DYrUfDhi.png",o="/assets/hashicorp-oidc-5-BuNV_lPV.png",c="/assets/hashicorp-oidc-6-B5IGgDM_.png",r="/assets/hashicorp-oidc-7-Cxy5Jsf4.png",u={},d=e(`<h1 id="nomad-vault를-keycloak-oidc로-관리하기-with-terraform" tabindex="-1"><a class="header-anchor" href="#nomad-vault를-keycloak-oidc로-관리하기-with-terraform"><span>Nomad, Vault를 keycloak oidc로 관리하기 with terraform</span></a></h1><p>요즘같이 사내에 많은 Open Source, Enterprise Soulition이 사용되는 시기에 각 Solution별로 <strong>ID/Password를 관리하는 것</strong>은 쉽지 않습니다.<br> 거기다 만약 Dev, Stage, Production등의 환경별로 구축이 되어 있다면 이미 ID/Password를 저장하고 관리하는 것만 으로도 <strong>굉장히 반복적이고 귀찮은 작업</strong>이 될 것 입니다.</p><p>우리는 이러한 상황을 해결하기 위해 IDP(Identity Provider) Solution을 사용합니다.<br> 다양한 IDP가 있겠으나 제가 속한 회사에서는 <strong>Keycloak</strong>을 사용하고 있고 그 Keycloak을 통해<br> gitlab, grafana, nomad, vault의 사용자 인증 및 권한관리를 하고 있습니다.<br> 이 중 <strong>Terraform code</strong>로 구현이 완벽히 된 <strong>Nomad와 Vault</strong>의 Code에 대해 설명드리겠습니다.</p><h2 id="keycloak-공통영역" tabindex="-1"><a class="header-anchor" href="#keycloak-공통영역"><span>Keycloak 공통영역</span></a></h2><ul><li>Realm, Users, Groups등을 미리 설정합니다. <ul><li>Groups은 아래와 같습니다. <ul><li>opsTeam: Write권한이 있는 사용자 그룹</li><li>devTeam: Read권한만 있는 사용자 그룹</li></ul></li></ul></li></ul><h3 id="terraform으로-keycloak의-사전-정보를-구현" tabindex="-1"><a class="header-anchor" href="#terraform으로-keycloak의-사전-정보를-구현"><span>Terraform으로 Keycloak의 사전 정보를 구현</span></a></h3><ul><li>계정 정보는 Yaml로 관리하며, Group은 아직 두개 뿐이라 Variables로 관리합니다.</li><li>reader, mgmt의 role 또한 여기서 생성됩니다.</li></ul><details><summary>Keycloak Common 코드 보기</summary><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#main.tf </span></span>
<span class="line">resource <span class="token string">&quot;keycloak_realm&quot;</span> <span class="token string">&quot;realm&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm   <span class="token operator">=</span> var.keycloak_realm</span>
<span class="line">  enabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_user&quot;</span> <span class="token string">&quot;user_reader&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  for_each <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">for</span> <span class="token for-or-select variable">user</span> <span class="token keyword">in</span> local.keycloak_reader<span class="token punctuation">[</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">]</span> <span class="token builtin class-name">:</span> user<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span><span class="token operator">&gt;</span> user <span class="token punctuation">}</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  username <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  enabled  <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">  email      <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  first_name <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;first_name&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  last_name  <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;last_name&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  initial_password <span class="token punctuation">{</span></span>
<span class="line">    value     <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;pwd&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    temporary <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_user&quot;</span> <span class="token string">&quot;user_management&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  for_each <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">for</span> <span class="token for-or-select variable">user</span> <span class="token keyword">in</span> local.keycloak_mgmt<span class="token punctuation">[</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">]</span> <span class="token builtin class-name">:</span> user<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span><span class="token operator">&gt;</span> user <span class="token punctuation">}</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  username <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  enabled  <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">  email      <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  first_name <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;first_name&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  last_name  <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;last_name&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  initial_password <span class="token punctuation">{</span></span>
<span class="line">    value     <span class="token operator">=</span> each.value<span class="token punctuation">[</span><span class="token string">&quot;pwd&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    temporary <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_role&quot;</span> <span class="token string">&quot;realm_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id    <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  name        <span class="token operator">=</span> <span class="token string">&quot;nomadoidc&quot;</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;My Realm Role&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_role&quot;</span> <span class="token string">&quot;mgmt_realm_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id    <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  name        <span class="token operator">=</span> var.keycloak_mgmt</span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;My mgmt Role&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_role&quot;</span> <span class="token string">&quot;redaer_realm_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id    <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  name        <span class="token operator">=</span> <span class="token string">&quot;reader&quot;</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;My redaer Role&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_group&quot;</span> <span class="token string">&quot;reader_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  name     <span class="token operator">=</span> var.keycloak_reader_group</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_group&quot;</span> <span class="token string">&quot;management_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  name     <span class="token operator">=</span> var.keycloak_mgmt_group</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">locals <span class="token punctuation">{</span></span>
<span class="line">  reader_usernames <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">user</span> <span class="token keyword">in</span> local.keycloak_reader<span class="token punctuation">[</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">]</span> <span class="token builtin class-name">:</span> user<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line">  mgmt_usernames <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">user</span> <span class="token keyword">in</span> local.keycloak_mgmt<span class="token punctuation">[</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">]</span> <span class="token builtin class-name">:</span> user<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">]</span>  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_group_memberships&quot;</span> <span class="token string">&quot;reader_group_members&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  group_id <span class="token operator">=</span> keycloak_group.reader_group.id</span>
<span class="line"></span>
<span class="line">  members  <span class="token operator">=</span> local.reader_usernames</span>
<span class="line">  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_group_memberships&quot;</span> <span class="token string">&quot;management_group_members&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  group_id <span class="token operator">=</span> keycloak_group.management_group.id</span>
<span class="line"></span>
<span class="line">  members  <span class="token operator">=</span> local.mgmt_usernames</span>
<span class="line">  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_group_roles&quot;</span> <span class="token string">&quot;reader_group_roles&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  group_id <span class="token operator">=</span> keycloak_group.reader_group.id</span>
<span class="line"></span>
<span class="line">  role_ids   <span class="token operator">=</span> <span class="token punctuation">[</span>keycloak_role.redaer_realm_role.id<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_group_roles&quot;</span> <span class="token string">&quot;mgmt_group_roles&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  group_id <span class="token operator">=</span> keycloak_group.management_group.id</span>
<span class="line"></span>
<span class="line">  role_ids   <span class="token operator">=</span> <span class="token punctuation">[</span>keycloak_role.mgmt_realm_role.id<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_client_scope&quot;</span> <span class="token string">&quot;groups&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  name     <span class="token operator">=</span> <span class="token string">&quot;groups&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_user_realm_role_protocol_mapper&quot;</span> <span class="token string">&quot;user_realm_role_mapper&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id        <span class="token operator">=</span> keycloak_realm.realm.id</span>
<span class="line">  client_scope_id <span class="token operator">=</span> keycloak_openid_client_scope.groups.id</span>
<span class="line">  name            <span class="token operator">=</span> <span class="token string">&quot;groups&quot;</span></span>
<span class="line"></span>
<span class="line">  claim_name <span class="token operator">=</span> <span class="token string">&quot;groups&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#var.tf</span></span>
<span class="line">variable <span class="token string">&quot;nomad_addr&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_addr&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_admin_user&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_admin_password&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_scheme&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;https&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_realm&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;HashiCorp&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;reader_yaml&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;reader.yaml&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;mgmt_yaml&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;mgmt.yaml&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">locals <span class="token punctuation">{</span></span>
<span class="line">  keycloak_reader <span class="token operator">=</span> yamldecode<span class="token punctuation">(</span>file<span class="token punctuation">(</span>var.reader_yaml<span class="token punctuation">))</span></span>
<span class="line">  keycloak_mgmt   <span class="token operator">=</span> yamldecode<span class="token punctuation">(</span>file<span class="token punctuation">(</span>var.mgmt_yaml<span class="token punctuation">))</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_mgmt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;mgmt&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_reader_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_mgmt_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">#mgmt.yaml</span></span>
<span class="line">users:</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line">users:</span>
<span class="line">  - username: ung</span>
<span class="line">    email: ung@mz.co.kr</span>
<span class="line">    first_name: ung</span>
<span class="line">    last_name: hee</span>
<span class="line">    pwd: ungungung</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line"><span class="token comment">#reader.yaml</span></span>
<span class="line">users:</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line">users:</span>
<span class="line">  - username: gslee</span>
<span class="line">    email: gs@hashicorp.com</span>
<span class="line">    first_name: gs</span>
<span class="line">    last_name: lee</span>
<span class="line">    pwd: gsgsgsgs</span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="nomad-oidc-terraform-code" tabindex="-1"><a class="header-anchor" href="#nomad-oidc-terraform-code"><span>Nomad OIDC Terraform Code</span></a></h2><h3 id="terraform으로-keycloak과-nomad-oidc-설정" tabindex="-1"><a class="header-anchor" href="#terraform으로-keycloak과-nomad-oidc-설정"><span>Terraform으로 Keycloak과 Nomad OIDC 설정</span></a></h3><ul><li>Keycloak oidc client를 생성합니다. <ul><li>valid_redirect_uri에 nomad oidc uri인 /oidc/callback, /ui/settings/tokens를 추가해줍니다.</li><li>Nomad Role = Keycloak Groups을 맵핑 시켜서 권한을 동기화 시킵니다.</li></ul></li><li>Nomad는 Token Base로 인증인가를 합니다. <ul><li>Token의 각 read, write role을 만듭니다.</li><li>그 role기반으로 Keycloak group과 맵핑합니다.</li></ul></li></ul><details><summary>Nomad, Keycloak 코드 보기</summary><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#keycloak.tf</span></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_client&quot;</span> <span class="token string">&quot;openid_client&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id  <span class="token operator">=</span> var.relam_id</span>
<span class="line">  client_id <span class="token operator">=</span> <span class="token string">&quot;nomadoidc&quot;</span></span>
<span class="line"></span>
<span class="line">  name                  <span class="token operator">=</span> <span class="token string">&quot;nomadoidc&quot;</span></span>
<span class="line">  enabled               <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">  standard_flow_enabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">  access_type <span class="token operator">=</span> <span class="token string">&quot;CONFIDENTIAL&quot;</span></span>
<span class="line">  valid_redirect_uris <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;<span class="token variable">\${var.nomad_scheme}</span>://<span class="token variable">\${var.nomad_addr}</span>/oidc/callback&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;<span class="token variable">\${var.nomad_scheme}</span>://<span class="token variable">\${var.nomad_addr}</span>/ui/settings/tokens&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;http://localhost:4649/oidc/callback&quot;</span>,</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  login_theme <span class="token operator">=</span> <span class="token string">&quot;keycloak&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_client_default_scopes&quot;</span> <span class="token string">&quot;client_default_scopes&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id  <span class="token operator">=</span> var.relam_id</span>
<span class="line">  client_id <span class="token operator">=</span> keycloak_openid_client.openid_client.id</span>
<span class="line"></span>
<span class="line">  default_scopes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;profile&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;email&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;roles&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;groups&quot;</span>,</span>
<span class="line">    keycloak_openid_client_scope.openid_client_scope.name</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">resource <span class="token string">&quot;keycloak_role&quot;</span> <span class="token string">&quot;management_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id    <span class="token operator">=</span> var.relam_id</span>
<span class="line">  client_id   <span class="token operator">=</span> keycloak_openid_client.openid_client.id</span>
<span class="line">  name        <span class="token operator">=</span> <span class="token string">&quot;mgmt&quot;</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;Management role&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_role&quot;</span> <span class="token string">&quot;reader_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id    <span class="token operator">=</span> var.relam_id</span>
<span class="line">  client_id   <span class="token operator">=</span> keycloak_openid_client.openid_client.id</span>
<span class="line">  name        <span class="token operator">=</span> <span class="token string">&quot;reader&quot;</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;Reader role&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_client_scope&quot;</span> <span class="token string">&quot;openid_client_scope&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id               <span class="token operator">=</span> var.relam_id</span>
<span class="line">  name                   <span class="token operator">=</span> keycloak_openid_client.openid_client.name</span>
<span class="line">  description            <span class="token operator">=</span> <span class="token string">&quot;When requested, this scope will map a user&#39;s group memberships to a claim&quot;</span></span>
<span class="line">  include_in_token_scope <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#nomad.tf</span></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_auth_method&quot;</span> <span class="token string">&quot;keycloak&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name           <span class="token operator">=</span> <span class="token string">&quot;keycloak&quot;</span></span>
<span class="line">  <span class="token builtin class-name">type</span>           <span class="token operator">=</span> <span class="token string">&quot;OIDC&quot;</span></span>
<span class="line">  token_locality <span class="token operator">=</span> <span class="token string">&quot;global&quot;</span></span>
<span class="line">  max_token_ttl  <span class="token operator">=</span> <span class="token string">&quot;150m0s&quot;</span></span>
<span class="line">  default        <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">  config <span class="token punctuation">{</span></span>
<span class="line">    oidc_discovery_url <span class="token operator">=</span> format<span class="token punctuation">(</span><span class="token string">&quot;<span class="token variable">\${var.keycloak_scheme}</span>://<span class="token variable">\${var.keycloak_addr}</span>/realms/%s&quot;</span>, var.keycloak_realm<span class="token punctuation">)</span></span>
<span class="line">    oidc_client_id     <span class="token operator">=</span> var.client_id</span>
<span class="line">    oidc_client_secret <span class="token operator">=</span> keycloak_openid_client.openid_client.client_secret</span>
<span class="line">    bound_audiences <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">      var.client_id</span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">    oidc_scopes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;groups&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">    allowed_redirect_uris <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;<span class="token variable">\${var.nomad_scheme}</span>://<span class="token variable">\${var.nomad_addr}</span>/oidc/callback&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;<span class="token variable">\${var.nomad_scheme}</span>://<span class="token variable">\${var.nomad_addr}</span>/ui/settings/tokens&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;http://localhost:4649/oidc/callback&quot;</span>, // CLI로 호출하는 경우를 위해 필요</span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">    list_claim_mappings <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">groups</span> <span class="token operator">=</span> <span class="token string">&quot;roles&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_binding_rule&quot;</span> <span class="token string">&quot;reader&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;reader rule&quot;</span></span>
<span class="line">  auth_method <span class="token operator">=</span> nomad_acl_auth_method.keycloak.name</span>
<span class="line">  selector    <span class="token operator">=</span> <span class="token string">&quot;reader in list.roles&quot;</span></span>
<span class="line">  bind_type   <span class="token operator">=</span> <span class="token string">&quot;role&quot;</span></span>
<span class="line">  bind_name   <span class="token operator">=</span> nomad_acl_role.dev.name</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_binding_rule&quot;</span> <span class="token string">&quot;mgmt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;management rule&quot;</span></span>
<span class="line">  auth_method <span class="token operator">=</span> nomad_acl_auth_method.keycloak.name</span>
<span class="line">  selector    <span class="token operator">=</span> <span class="token string">&quot;mgmt in list.roles&quot;</span></span>
<span class="line">  bind_type   <span class="token operator">=</span> <span class="token string">&quot;role&quot;</span></span>
<span class="line">  bind_name   <span class="token operator">=</span> nomad_acl_role.mgmt.name</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_policy&quot;</span> <span class="token string">&quot;dev&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name <span class="token operator">=</span> var.nomad_reader</span>
<span class="line"></span>
<span class="line">  rules_hcl <span class="token operator">=</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOT</span>
<span class="line">namespace &quot;*&quot; {</span>
<span class="line">  policy = &quot;read&quot;</span>
<span class="line">  capabilities = [</span>
<span class="line">    &quot;list-jobs&quot;,</span>
<span class="line">    &quot;parse-job&quot;,</span>
<span class="line">    &quot;read-job&quot;,</span>
<span class="line">    &quot;csi-list-volume&quot;,</span>
<span class="line">    &quot;csi-read-volume&quot;,</span>
<span class="line">    &quot;list-scaling-policies&quot;,</span>
<span class="line">    &quot;read-scaling-policy&quot;</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">EOT</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_role&quot;</span> <span class="token string">&quot;dev&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name        <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${var.nomad_reader}</span>-acl-role&quot;</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;An ACL Role for cluster dev&quot;</span></span>
<span class="line"></span>
<span class="line">  policy <span class="token punctuation">{</span></span>
<span class="line">    name <span class="token operator">=</span> nomad_acl_policy.dev.name</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_policy&quot;</span> <span class="token string">&quot;mgmt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name <span class="token operator">=</span> var.nomad_mgmt</span>
<span class="line"></span>
<span class="line">  rules_hcl <span class="token operator">=</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOT</span>
<span class="line">namespace &quot;*&quot; {</span>
<span class="line">  policy = &quot;write&quot;</span>
<span class="line">    capabilities = [</span>
<span class="line">      &quot;list-jobs&quot;,</span>
<span class="line">      &quot;parse-job&quot;,</span>
<span class="line">      &quot;read-job&quot;,</span>
<span class="line">      &quot;submit-job&quot;,</span>
<span class="line">      &quot;dispatch-job&quot;,</span>
<span class="line">      &quot;read-logs&quot;,</span>
<span class="line">      &quot;read-fs&quot;,</span>
<span class="line">      &quot;alloc-exec&quot;,</span>
<span class="line">      &quot;alloc-lifecycle&quot;,</span>
<span class="line">      &quot;csi-write-volume&quot;,</span>
<span class="line">      &quot;csi-mount-volume&quot;,</span>
<span class="line">      &quot;list-scaling-policies&quot;,</span>
<span class="line">      &quot;read-scaling-policy&quot;,</span>
<span class="line">      &quot;read-job-scaling&quot;,</span>
<span class="line">      &quot;scale-job&quot;</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line">EOT</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;nomad_acl_role&quot;</span> <span class="token string">&quot;mgmt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name        <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${var.nomad_mgmt}</span>-acl-role&quot;</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string">&quot;An ACL Role for cluster mgmt&quot;</span></span>
<span class="line"></span>
<span class="line">  policy <span class="token punctuation">{</span></span>
<span class="line">    name <span class="token operator">=</span> nomad_acl_policy.mgmt.name</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># var.tf</span></span>
<span class="line">variable <span class="token string">&quot;nomad_addr&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_addr&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_admin_user&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_admin_password&quot;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;nomad_scheme&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;https&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;nomad_region&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;global&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_scheme&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;https&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;keycloak_realm&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;HashiCorp&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;nomad_reader&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;nomad_mgmt&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string">&quot;client_id&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string">&quot;nomadoidc&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="결과화면-추가" tabindex="-1"><a class="header-anchor" href="#결과화면-추가"><span>결과화면 추가</span></a></h3><ul><li>Nomad UI에서 SSO 연동 버튼이 활성화됩니다.</li></ul><figure><img src="`+l+'" alt="Nomad UI" tabindex="0" loading="lazy"><figcaption>Nomad UI</figcaption></figure><ul><li>Mgmt group인 ung 계정으로 로그인 하면 opsTeam의 write권한을 할당받습니다.</li></ul><figure><img src="'+i+'" alt="Nomad UI" tabindex="0" loading="lazy"><figcaption>Nomad UI</figcaption></figure><ul><li>Reader group인 gslee 계정으로 로그인 하면 devTeam의 read권한을 할당받습니다.</li></ul><figure><img src="'+p+`" alt="Nomad UI" tabindex="0" loading="lazy"><figcaption>Nomad UI</figcaption></figure><h2 id="vault-oidc-terraform-code" tabindex="-1"><a class="header-anchor" href="#vault-oidc-terraform-code"><span>Vault OIDC Terraform Code</span></a></h2><h3 id="terraform으로-keycloak과-vault-oidc-설정" tabindex="-1"><a class="header-anchor" href="#terraform으로-keycloak과-vault-oidc-설정"><span>Terraform으로 Keycloak과 Vault OIDC 설정</span></a></h3><ul><li>Keycloak oidc client를 생성합니다.</li><li>Vault는 entity group의 alias name과 Keycloak group name을 맵핑합니다. <ul><li>Vault group 생성 시에는 external로 생성이 필요합니다.</li><li>opsTeam에는 전체 Write권한을, devTeam에는 전체 Read권한을 적용합니다.</li></ul></li></ul><details><summary>Vault, Keycloak 코드 보기</summary><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#keycloak.tf</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_client&quot;</span> <span class="token string">&quot;openid_client&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id  <span class="token operator">=</span> var.relam_id</span>
<span class="line">  client_id <span class="token operator">=</span> <span class="token string">&quot;vault-oidc-ung&quot;</span></span>
<span class="line"></span>
<span class="line">  name                  <span class="token operator">=</span> <span class="token string">&quot;vault-oidc-ung&quot;</span></span>
<span class="line">  enabled               <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">  standard_flow_enabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line">  access_type <span class="token operator">=</span> <span class="token string">&quot;CONFIDENTIAL&quot;</span></span>
<span class="line">  valid_redirect_uris <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/*&quot;</span></span>
<span class="line">   <span class="token punctuation">]</span></span>
<span class="line">  login_theme <span class="token operator">=</span> <span class="token string">&quot;keycloak&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;keycloak_openid_user_client_role_protocol_mapper&quot;</span> <span class="token string">&quot;user_client_role_mapper&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  realm_id  <span class="token operator">=</span> var.relam_id</span>
<span class="line">  client_id <span class="token operator">=</span> keycloak_openid_client.openid_client.id</span>
<span class="line">  name      <span class="token operator">=</span> <span class="token string">&quot;ung-user-client-role-mapper&quot;</span></span>
<span class="line">  claim_name <span class="token operator">=</span> format<span class="token punctuation">(</span><span class="token string">&quot;resource_access.%s.roles&quot;</span>,</span>
<span class="line">  keycloak_openid_client.openid_client.client_id<span class="token punctuation">)</span></span>
<span class="line">  multivalued <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#vault.tf</span></span>
<span class="line">resource <span class="token string">&quot;vault_identity_oidc_key&quot;</span> <span class="token string">&quot;keycloak_provider_key&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name      <span class="token operator">=</span> <span class="token string">&quot;keycloak&quot;</span></span>
<span class="line">  algorithm <span class="token operator">=</span> <span class="token string">&quot;RS256&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_jwt_auth_backend&quot;</span> <span class="token string">&quot;keycloak&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  path               <span class="token operator">=</span> <span class="token string">&quot;oidc-keycloak&quot;</span></span>
<span class="line">  <span class="token builtin class-name">type</span>               <span class="token operator">=</span> <span class="token string">&quot;oidc&quot;</span></span>
<span class="line">  default_role       <span class="token operator">=</span> <span class="token string">&quot;default&quot;</span></span>
<span class="line">  oidc_discovery_url <span class="token operator">=</span> format<span class="token punctuation">(</span><span class="token string">&quot;<span class="token variable">\${var.keycloak_url}</span>/realms/HashiCorp&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  oidc_client_id     <span class="token operator">=</span> keycloak_openid_client.openid_client.client_id</span>
<span class="line">  oidc_client_secret <span class="token operator">=</span> keycloak_openid_client.openid_client.client_secret</span>
<span class="line">  </span>
<span class="line">  tune <span class="token punctuation">{</span></span>
<span class="line">    audit_non_hmac_request_keys  <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    audit_non_hmac_response_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    default_lease_ttl            <span class="token operator">=</span> <span class="token string">&quot;1h&quot;</span></span>
<span class="line">    listing_visibility           <span class="token operator">=</span> <span class="token string">&quot;unauth&quot;</span></span>
<span class="line">    max_lease_ttl                <span class="token operator">=</span> <span class="token string">&quot;1h&quot;</span></span>
<span class="line">    passthrough_request_headers  <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    token_type                   <span class="token operator">=</span> <span class="token string">&quot;default-service&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_jwt_auth_backend_role&quot;</span> <span class="token string">&quot;devteam&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  backend       <span class="token operator">=</span> vault_jwt_auth_backend.keycloak.path</span>
<span class="line">  role_name     <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line">  token_ttl     <span class="token operator">=</span> <span class="token number">3600</span></span>
<span class="line">  token_max_ttl <span class="token operator">=</span> <span class="token number">3600</span></span>
<span class="line">  token_policies <span class="token operator">=</span> concat<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;devTeam&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">  bound_audiences <span class="token operator">=</span> <span class="token punctuation">[</span>keycloak_openid_client.openid_client.client_id<span class="token punctuation">]</span></span>
<span class="line">  user_claim      <span class="token operator">=</span> <span class="token string">&quot;sub&quot;</span></span>
<span class="line">  claim_mappings <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    preferred_username <span class="token operator">=</span> <span class="token string">&quot;username&quot;</span></span>
<span class="line">    email              <span class="token operator">=</span> <span class="token string">&quot;email&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  role_type             <span class="token operator">=</span> <span class="token string">&quot;oidc&quot;</span></span>
<span class="line">  allowed_redirect_uris <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/ui/vault/auth/oidc-keycloak/oidc/callback&quot;</span>, </span>
<span class="line">                            <span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/oidc/callback&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">#groups_claim          = format(&quot;/resource_access/%s/roles&quot;, keycloak_openid_client.openid_client.client_id)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_oidc_key&quot;</span> <span class="token string">&quot;keycloak_provider_key&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name      <span class="token operator">=</span> <span class="token string">&quot;keycloak&quot;</span></span>
<span class="line">  algorithm <span class="token operator">=</span> <span class="token string">&quot;RS256&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_jwt_auth_backend&quot;</span> <span class="token string">&quot;keycloak&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  path               <span class="token operator">=</span> <span class="token string">&quot;oidc-keycloak&quot;</span></span>
<span class="line">  <span class="token builtin class-name">type</span>               <span class="token operator">=</span> <span class="token string">&quot;oidc&quot;</span></span>
<span class="line">  default_role       <span class="token operator">=</span> <span class="token string">&quot;default&quot;</span></span>
<span class="line">  oidc_discovery_url <span class="token operator">=</span> format<span class="token punctuation">(</span><span class="token string">&quot;<span class="token variable">\${var.keycloak_url}</span>/realms/HashiCorp&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  oidc_client_id     <span class="token operator">=</span> keycloak_openid_client.openid_client.client_id</span>
<span class="line">  oidc_client_secret <span class="token operator">=</span> keycloak_openid_client.openid_client.client_secret</span>
<span class="line">  </span>
<span class="line">  tune <span class="token punctuation">{</span></span>
<span class="line">    audit_non_hmac_request_keys  <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    audit_non_hmac_response_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    default_lease_ttl            <span class="token operator">=</span> <span class="token string">&quot;1h&quot;</span></span>
<span class="line">    listing_visibility           <span class="token operator">=</span> <span class="token string">&quot;unauth&quot;</span></span>
<span class="line">    max_lease_ttl                <span class="token operator">=</span> <span class="token string">&quot;1h&quot;</span></span>
<span class="line">    passthrough_request_headers  <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    token_type                   <span class="token operator">=</span> <span class="token string">&quot;default-service&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_jwt_auth_backend_role&quot;</span> <span class="token string">&quot;devteam&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  backend       <span class="token operator">=</span> vault_jwt_auth_backend.keycloak.path</span>
<span class="line">  role_name     <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line">  token_ttl     <span class="token operator">=</span> <span class="token number">3600</span></span>
<span class="line">  token_max_ttl <span class="token operator">=</span> <span class="token number">3600</span></span>
<span class="line">  token_policies <span class="token operator">=</span> concat<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;devTeam&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">  bound_audiences <span class="token operator">=</span> <span class="token punctuation">[</span>keycloak_openid_client.openid_client.client_id<span class="token punctuation">]</span></span>
<span class="line">  user_claim      <span class="token operator">=</span> <span class="token string">&quot;sub&quot;</span></span>
<span class="line">  claim_mappings <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    preferred_username <span class="token operator">=</span> <span class="token string">&quot;username&quot;</span></span>
<span class="line">    email              <span class="token operator">=</span> <span class="token string">&quot;email&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  role_type             <span class="token operator">=</span> <span class="token string">&quot;oidc&quot;</span></span>
<span class="line">  allowed_redirect_uris <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/ui/vault/auth/oidc-keycloak/oidc/callback&quot;</span>, </span>
<span class="line">                            <span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/oidc/callback&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">#groups_claim          = format(&quot;/resource_access/%s/roles&quot;, keycloak_openid_client.openid_client.client_id)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_jwt_auth_backend_role&quot;</span> <span class="token string">&quot;opsteam&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  backend       <span class="token operator">=</span> vault_jwt_auth_backend.keycloak.path</span>
<span class="line">  role_name     <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line">  token_ttl     <span class="token operator">=</span> <span class="token number">3600</span></span>
<span class="line">  token_max_ttl <span class="token operator">=</span> <span class="token number">3600</span></span>
<span class="line">  token_policies <span class="token operator">=</span> concat<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;opsTeam&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">  bound_audiences <span class="token operator">=</span> <span class="token punctuation">[</span>keycloak_openid_client.openid_client.client_id<span class="token punctuation">]</span></span>
<span class="line">  user_claim      <span class="token operator">=</span> <span class="token string">&quot;sub&quot;</span></span>
<span class="line">  claim_mappings <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    preferred_username <span class="token operator">=</span> <span class="token string">&quot;username&quot;</span></span>
<span class="line">    email              <span class="token operator">=</span> <span class="token string">&quot;email&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  role_type             <span class="token operator">=</span> <span class="token string">&quot;oidc&quot;</span></span>
<span class="line">  allowed_redirect_uris <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/ui/vault/auth/oidc-keycloak/oidc/callback&quot;</span>, </span>
<span class="line">                            <span class="token string">&quot;<span class="token variable">\${var.vault_url}</span>/oidc/callback&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment">#groups_claim          = format(&quot;/resource_access/%s/roles&quot;, keycloak_openid_client.openid_client.client_id)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#------------------------------------------------------------------------------#</span></span>
<span class="line"><span class="token comment"># Reader Vault policy</span></span>
<span class="line"><span class="token comment">#------------------------------------------------------------------------------#</span></span>
<span class="line"></span>
<span class="line">data <span class="token string">&quot;vault_policy_document&quot;</span> <span class="token string">&quot;devTeam_policy&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  rule <span class="token punctuation">{</span></span>
<span class="line">    path         <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">    capabilities <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;read&quot;</span>, <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_policy&quot;</span> <span class="token string">&quot;devTeam_policy&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name   <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line">  policy <span class="token operator">=</span> data.vault_policy_document.devTeam_policy.hcl</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_oidc_role&quot;</span> <span class="token string">&quot;devTeam_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line">  key  <span class="token operator">=</span> vault_identity_oidc_key.keycloak_provider_key.name</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_group&quot;</span> <span class="token string">&quot;devTeam_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name     <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line">  <span class="token builtin class-name">type</span>     <span class="token operator">=</span> <span class="token string">&quot;external&quot;</span></span>
<span class="line">  policies <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    vault_policy.devTeam_policy.name</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_group_alias&quot;</span> <span class="token string">&quot;reader_group_alias&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name           <span class="token operator">=</span> <span class="token string">&quot;devTeam&quot;</span></span>
<span class="line">  mount_accessor <span class="token operator">=</span> vault_jwt_auth_backend.keycloak.accessor</span>
<span class="line">  canonical_id   <span class="token operator">=</span> vault_identity_group.devTeam_group.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#------------------------------------------------------------------------------#</span></span>
<span class="line"><span class="token comment"># Mgmt Vault policy</span></span>
<span class="line"><span class="token comment">#------------------------------------------------------------------------------#</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">data <span class="token string">&quot;vault_policy_document&quot;</span> <span class="token string">&quot;opsTeam_policy&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  rule <span class="token punctuation">{</span></span>
<span class="line">    path         <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">    capabilities <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span>, <span class="token string">&quot;update&quot;</span>, <span class="token string">&quot;delete&quot;</span>, <span class="token string">&quot;read&quot;</span>, <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_policy&quot;</span> <span class="token string">&quot;opsTeam_policy&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name   <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line">  policy <span class="token operator">=</span> data.vault_policy_document.opsTeam_policy.hcl</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_oidc_role&quot;</span> <span class="token string">&quot;opsTeam_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line">  key  <span class="token operator">=</span> vault_identity_oidc_key.keycloak_provider_key.name</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_group&quot;</span> <span class="token string">&quot;opsTeam_group&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name     <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line">  <span class="token builtin class-name">type</span>     <span class="token operator">=</span> <span class="token string">&quot;external&quot;</span></span>
<span class="line">  policies <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    vault_policy.opsTeam_policy.name</span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string">&quot;vault_identity_group_alias&quot;</span> <span class="token string">&quot;mgmt_group_alias&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  name           <span class="token operator">=</span> <span class="token string">&quot;opsTeam&quot;</span></span>
<span class="line">  mount_accessor <span class="token operator">=</span> vault_jwt_auth_backend.keycloak.accessor</span>
<span class="line">  canonical_id   <span class="token operator">=</span> vault_identity_group.opsTeam_group.id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="결과화면" tabindex="-1"><a class="header-anchor" href="#결과화면"><span>결과화면</span></a></h3><ul><li>Vault UI에서 SSO 연동 버튼이 활성화됩니다. <ul><li>namespace는 ung, Role은 opsTeam으로 로그인합니다.</li></ul></li></ul><figure><img src="`+t+'" alt="Vault UI" tabindex="0" loading="lazy"><figcaption>Vault UI</figcaption></figure><ul><li>opsTeam으로 로그인하면 Write권한이 있습니다.</li></ul><figure><img src="'+o+'" alt="Vault UI" tabindex="0" loading="lazy"><figcaption>Vault UI</figcaption></figure><ul><li>로그아웃 후 이번에는 devTeam으로 로그인합니다.</li></ul><figure><img src="'+c+'" alt="Vault UI" tabindex="0" loading="lazy"><figcaption>Vault UI</figcaption></figure><ul><li>opsTeam과 다르게 Secret update, delete 권한이 없습니다.</li></ul><figure><img src="'+r+'" alt="Vault UI" tabindex="0" loading="lazy"><figcaption>Vault UI</figcaption></figure><h3 id="마치며" tabindex="-1"><a class="header-anchor" href="#마치며"><span>마치며</span></a></h3><ul><li>Terraform Provider만 있다면 즉, API만 제공된다면 위와 같이 code로 oidc 연동부터 계정 관리 및 권한 체계까지 관리할 수 있게 됩니다. 이러한 상황에 이점은 code화 된 권한 쳬게와 계정관리로 인한 휴먼 에러나 추가 생성 및 변경에 대해 이력관리 및 확장성에 이점이 있다고 보면 될 것 같습니다.</li></ul>',34),v=[d];function m(k,b){return n(),a("div",null,v)}const g=s(u,[["render",m],["__file","hashicorp-oidc.html.vue"]]),y=JSON.parse('{"path":"/04-HashiCorp/03-Terraform/03-Sample/hashicorp-oidc.html","title":"Nomad, Vault를 keycloak oidc로 관리하기 with terraform","lang":"ko-KR","frontmatter":{"head":[["meta",{"name":"Nomad, Vault를 keycloak oidc로 관리하기 with terraform","content":"다양한 Soulution을 keycloak을 통해 oidc를 적용하고 관리"}],["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/03-Terraform/03-Sample/hashicorp-oidc.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Nomad, Vault를 keycloak oidc로 관리하기 with terraform"}],["meta",{"property":"og:description","content":"Nomad, Vault를 keycloak oidc로 관리하기 with terraform 요즘같이 사내에 많은 Open Source, Enterprise Soulition이 사용되는 시기에 각 Solution별로 ID/Password를 관리하는 것은 쉽지 않습니다. 거기다 만약 Dev, Stage, Production..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-09-24T06:48:52.000Z"}],["meta",{"property":"article:author","content":"unghee"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"nomad"}],["meta",{"property":"article:tag","content":"keycloak"}],["meta",{"property":"article:tag","content":"oidc"}],["meta",{"property":"article:tag","content":"terraform"}],["meta",{"property":"article:modified_time","content":"2024-09-24T06:48:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nomad, Vault를 keycloak oidc로 관리하기 with terraform\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-24T06:48:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"unghee\\"}]}"]],"author":"unghee","tag":["vault","nomad","keycloak","oidc","terraform"],"description":"Nomad, Vault를 keycloak oidc로 관리하기 with terraform 요즘같이 사내에 많은 Open Source, Enterprise Soulition이 사용되는 시기에 각 Solution별로 ID/Password를 관리하는 것은 쉽지 않습니다. 거기다 만약 Dev, Stage, Production..."},"headers":[{"level":2,"title":"Keycloak 공통영역","slug":"keycloak-공통영역","link":"#keycloak-공통영역","children":[{"level":3,"title":"Terraform으로 Keycloak의 사전 정보를 구현","slug":"terraform으로-keycloak의-사전-정보를-구현","link":"#terraform으로-keycloak의-사전-정보를-구현","children":[]}]},{"level":2,"title":"Nomad OIDC Terraform Code","slug":"nomad-oidc-terraform-code","link":"#nomad-oidc-terraform-code","children":[{"level":3,"title":"Terraform으로 Keycloak과 Nomad OIDC 설정","slug":"terraform으로-keycloak과-nomad-oidc-설정","link":"#terraform으로-keycloak과-nomad-oidc-설정","children":[]},{"level":3,"title":"결과화면 추가","slug":"결과화면-추가","link":"#결과화면-추가","children":[]}]},{"level":2,"title":"Vault OIDC Terraform Code","slug":"vault-oidc-terraform-code","link":"#vault-oidc-terraform-code","children":[{"level":3,"title":"Terraform으로 Keycloak과 Vault OIDC 설정","slug":"terraform으로-keycloak과-vault-oidc-설정","link":"#terraform으로-keycloak과-vault-oidc-설정","children":[]},{"level":3,"title":"결과화면","slug":"결과화면","link":"#결과화면","children":[]},{"level":3,"title":"마치며","slug":"마치며","link":"#마치며","children":[]}]}],"git":{"createdTime":1727147516000,"updatedTime":1727160532000,"contributors":[{"name":"ung","email":"ung@mz.co.kr","commits":2}]},"readingTime":{"minutes":19.22,"words":1153},"filePathRelative":"04-HashiCorp/03-Terraform/03-Sample/hashicorp-oidc.md","localizedDate":"2024년 9월 24일","excerpt":"\\n<p>요즘같이 사내에 많은 Open Source, Enterprise Soulition이 사용되는 시기에 각 Solution별로 <strong>ID/Password를 관리하는 것</strong>은 쉽지 않습니다.<br>\\n거기다 만약 Dev, Stage, Production등의 환경별로 구축이 되어 있다면 이미 ID/Password를 저장하고 관리하는 것만 으로도 <strong>굉장히 반복적이고 귀찮은 작업</strong>이 될 것 입니다.</p>\\n<p>우리는 이러한 상황을 해결하기 위해 IDP(Identity Provider) Solution을 사용합니다.<br>\\n다양한 IDP가 있겠으나 제가 속한 회사에서는 <strong>Keycloak</strong>을 사용하고 있고 그 Keycloak을 통해<br>\\ngitlab, grafana, nomad, vault의 사용자 인증 및 권한관리를 하고 있습니다.<br>\\n이 중 <strong>Terraform code</strong>로 구현이 완벽히 된 <strong>Nomad와 Vault</strong>의 Code에 대해 설명드리겠습니다.</p>","copyright":{"author":"unghee"},"autoDesc":true}');export{g as comp,y as data};
