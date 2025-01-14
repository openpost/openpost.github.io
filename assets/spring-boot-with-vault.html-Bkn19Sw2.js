import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,h as p}from"./app-DhMJQ1_3.js";const t="/assets/aws-auth-2-ClPQVFqZ.png",e="/assets/aws-auth-1-DllmqSts.png",l="/assets/aws-auth-3-CBGrmdM5.png",o={},c=p(`<h1 id="vault로-spring-boot-구성관리-aws-auth-version" tabindex="-1"><a class="header-anchor" href="#vault로-spring-boot-구성관리-aws-auth-version"><span>Vault로 Spring Boot 구성관리 aws-auth Version</span></a></h1><blockquote><p>token, app-role로 관리: <a href="https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot.html" target="_blank" rel="noopener noreferrer">docmoa</a></p></blockquote><p>Spring boot에서는 Token, App-role을 제외하고 aws-auth를 통해서도 Secret을 주입 할 수 있습니다.<br> aws-auth에서는 다음의 두 기능을 지원합니다.</p><ul><li>AWS IAM <ul><li>EC2에 적용되는 AWS IAM Name을 기반으로 인증, 인가를 받고 Application이 <strong>실행</strong> 될 때 Secret을 주입합니다.</li></ul></li><li>EC2 Tag <ul><li>EC2에 적용되는 AWS Tag Name의 Value 기반으로 인증, 인가를 받고 Application이 <strong>실행</strong> 될 때 Secret을 주입합니다.</li></ul></li></ul><p>두 기능에 대한 장점은 Spring boot의 공통 영역인 application.yaml의 token이나 app-role의 값이 노출되는 것을 방지할 수 있고, ci/cd 단계 또한 치환하는 과정이 줄어듭니다.</p><p>자세한 기능들은 아래의 설정을 보면서 알아보겠습니다.</p><ol><li>Vault Secret 설정</li></ol><ul><li>Vault Secret은 아래와 같이 설정했습니다.</li><li>여기서 생성하는 <strong>Secret Engine</strong>명과 <strong>KV Path</strong>명을 기준으로 자동화를 쉽게 할 수 있습니다.</li></ul><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token comment"># Vault Secret engine의 이름을 spring* application 이름과 동일하게 맞추면 조금 더 설정이 쉽습니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_mount&quot;</span></span> <span class="token string">&quot;kv_spring&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">path</span>    <span class="token punctuation">=</span> <span class="token string">&quot;java_and_vault&quot;</span></span>
<span class="line">  <span class="token property">type</span>    <span class="token punctuation">=</span> <span class="token string">&quot;kv&quot;</span></span>
<span class="line">  <span class="token property">options</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span> <span class="token property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># secret engine path는 profile 명으로 지정한다면 조금 더 설정이 쉽습니다.</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_kv_secret_v2&quot;</span></span> <span class="token string">&quot;kv_java_and_vault_dev&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">mount</span>               <span class="token punctuation">=</span> vault_mount.kv_spring.path</span>
<span class="line">  <span class="token property">name</span>                <span class="token punctuation">=</span> <span class="token string">&quot;dev&quot;</span></span>
<span class="line">  <span class="token property">cas</span>                 <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line">  <span class="token property">delete_all_versions</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token property">data_json</span> <span class="token punctuation">=</span> jsonencode(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;cloud.aws.s3.accessKey&quot;</span>     <span class="token punctuation">=</span> <span class="token string">&quot;aws_access&quot;</span>,</span>
<span class="line">    <span class="token property">&quot;cloud.aws.s3.bucket&quot;</span>        <span class="token punctuation">=</span> <span class="token string">&quot;gc-vault-test&quot;</span>,</span>
<span class="line">    <span class="token property">&quot;cloud.aws.s3.region&quot;</span>        <span class="token punctuation">=</span> <span class="token string">&quot;ap-northeast-2&quot;</span>,</span>
<span class="line">    <span class="token property">&quot;cloud.aws.s3.secretKey&quot;</span>     <span class="token punctuation">=</span> <span class="token string">&quot;aws_secret&quot;</span>,</span>
<span class="line">    <span class="token property">&quot;spring.datasource.password&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;password&quot;</span>,</span>
<span class="line">    <span class="token property">&quot;spring.datasource.url&quot;</span>      <span class="token punctuation">=</span> <span class="token string">&quot;db_url&quot;</span>,</span>
<span class="line">    <span class="token property">&quot;spring.datasource.username&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;username&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>Vault AWS-Auth 설정 (IAM, EC2-Tag)</li></ol><ul><li>aws_spring_boot_iam <ul><li>iam 기준으로 인증하는 aws-auth role입니다.</li><li>미리 생성한 aws iam을 &quot;bound_iam_role_arns&quot;에 명시합니다.</li></ul></li><li>aws_spring_boot_ec2 <ul><li>ec2 tag 기준으로 인증하는 aws-auth role입니다.</li><li>ec2에 tag key로 &quot;role_tag&quot; value로는 output인 &quot;vault_ec2_tag&quot;에 값을 입력합니다.</li></ul></li></ul><div class="language-hcl" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_policy&quot;</span></span> <span class="token string">&quot;policy_spring_boot&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;spring-boot-vault&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">policy</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOT</span>
<span class="line">path &quot;\${vault_mount.kv_spring.path}/data/java_and_vault&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">path &quot;\${vault_mount.kv_spring.path}/data/java_and_vault/dev&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;]</span>
<span class="line">}</span>
<span class="line">EOT</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_auth_backend&quot;</span></span> <span class="token string">&quot;aws&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">type</span> <span class="token punctuation">=</span> <span class="token string">&quot;aws&quot;</span></span>
<span class="line">  <span class="token property">path</span> <span class="token punctuation">=</span> <span class="token string">&quot;aws&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_aws_auth_backend_role&quot;</span></span> <span class="token string">&quot;aws_spring_boot_iam&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">backend</span>   <span class="token punctuation">=</span> vault_auth_backend.aws.path</span>
<span class="line">  <span class="token property">role</span>      <span class="token punctuation">=</span> <span class="token string">&quot;aws-spring-boot-iam&quot;</span></span>
<span class="line">  <span class="token property">auth_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;iam&quot;</span></span>
<span class="line">  <span class="token property">bound_iam_role_arns</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;arn:aws:iam::accountID:role/vault_role&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">inferred_entity_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;ec2_instance&quot;</span></span>
<span class="line">  <span class="token property">inferred_aws_region</span>  <span class="token punctuation">=</span> <span class="token string">&quot;ap-northeast-2&quot;</span></span>
<span class="line">  <span class="token property">token_policies</span>       <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>vault_policy<span class="token punctuation">.</span>policy_spring_boot<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_aws_auth_backend_role&quot;</span></span> <span class="token string">&quot;aws_spring_boot_ec2&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">backend</span>           <span class="token punctuation">=</span> vault_auth_backend.aws.path</span>
<span class="line">  <span class="token property">role</span>              <span class="token punctuation">=</span> <span class="token string">&quot;aws-spring-boot-ec2&quot;</span></span>
<span class="line">  <span class="token property">auth_type</span>         <span class="token punctuation">=</span> <span class="token string">&quot;ec2&quot;</span></span>
<span class="line">  <span class="token property">bound_account_ids</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;accountID&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token property">role_tag</span>          <span class="token punctuation">=</span> <span class="token string">&quot;svc_type&quot;</span></span>
<span class="line">  <span class="token property">token_policies</span>    <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;<span class="token interpolation"><span class="token punctuation">$</span><span class="token punctuation">{</span>vault_policy<span class="token punctuation">.</span>policy_spring_boot<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;vault_aws_auth_backend_role_tag&quot;</span></span> <span class="token string">&quot;aws_spring_boot_ec2_tag&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">backend</span> <span class="token punctuation">=</span> vault_auth_backend.aws.path</span>
<span class="line">  <span class="token property">role</span>    <span class="token punctuation">=</span> vault_aws_auth_backend_role.aws_spring_boot_ec2.role</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">output<span class="token type variable"> &quot;vault_ec2_tag&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">value</span> <span class="token punctuation">=</span> vault_aws_auth_backend_role_tag.aws_spring_boot_ec2_tag.tag_value</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>공통영역 (AWS-IAM)</li></ol><ul><li>application.yaml 파일입니다.</li><li>아래와 같이 datasource와 aws 접근 정보를 생략한다고 해도 제 데이터는 Vault Secret Engine Path의 key명 기준으로 Value값을 치환합니다.</li><li>ex)s3 접근하는 accesskey는 &quot;cloud.aws.s3.accessKey&quot;의 Value 값인 &quot;aws_access&quot;를 치환합니다.</li></ul><div class="language-yaml" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">thymeleaf</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">check-template-location</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">prefix</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>/templates/</span>
<span class="line">    <span class="token key atrule">suffix</span><span class="token punctuation">:</span> .html</span>
<span class="line">    <span class="token key atrule">mode</span><span class="token punctuation">:</span> HTML</span>
<span class="line">    <span class="token key atrule">encoding</span><span class="token punctuation">:</span> UTF<span class="token punctuation">-</span><span class="token number">8</span></span>
<span class="line">    <span class="token key atrule">content-type</span><span class="token punctuation">:</span> text/html</span>
<span class="line">    <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">devtools</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">livereload</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">cloud</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">vault</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">host</span><span class="token punctuation">:</span> vault_URL</span>
<span class="line">      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8200</span></span>
<span class="line">      <span class="token key atrule">scheme</span><span class="token punctuation">:</span> https</span>
<span class="line">      <span class="token key atrule">namespace</span><span class="token punctuation">:</span> admin</span>
<span class="line">      <span class="token comment">#인증은 AWS IAM으로 합니다.</span></span>
<span class="line">      <span class="token key atrule">authentication</span><span class="token punctuation">:</span> AWS_IAM</span>
<span class="line">      <span class="token key atrule">aws-iam</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">aws-path</span><span class="token punctuation">:</span> aws</span>
<span class="line">        <span class="token comment">#위에서 Vault에서 만든 role을 명시합니다.</span></span>
<span class="line">        <span class="token key atrule">role</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>spring<span class="token punctuation">-</span>boot<span class="token punctuation">-</span>iam</span>
<span class="line">        <span class="token key atrule">endpoint-uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//sts.ap<span class="token punctuation">-</span>northeast<span class="token punctuation">-</span>2.amazonaws.com</span>
<span class="line">      <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">          <span class="token key atrule">min-renewal</span><span class="token punctuation">:</span> 10s</span>
<span class="line">          <span class="token key atrule">renew-interval</span><span class="token punctuation">:</span> 10s</span>
<span class="line">      <span class="token key atrule">kv</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">        <span class="token key atrule">backend</span><span class="token punctuation">:</span> kv_example</span>
<span class="line">        <span class="token key atrule">profile-separator</span><span class="token punctuation">:</span> /</span>
<span class="line">      <span class="token key atrule">application-name</span><span class="token punctuation">:</span> java_and_vault</span>
<span class="line">      <span class="token key atrule">profiles</span><span class="token punctuation">:</span> dev</span>
<span class="line">      <span class="token key atrule">generic</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">import</span><span class="token punctuation">:</span> vault<span class="token punctuation">:</span>//</span>
<span class="line"></span></code></pre></div><ol start="4"><li>공통영역 (AWS-EC2-Tag)</li></ol><ul><li>application.yaml 파일입니다.</li><li>아래와 같이 datasource와 aws 접근 정보를 생략한다고 해도 제 데이터는 Vault Secret Engine Path의 key명 기준으로 Value값을 치환합니다.</li><li>ex)s3 접근하는 accesskey는 &quot;cloud.aws.s3.accessKey&quot;의 Value 값인 &quot;aws_access&quot;를 치환합니다.</li></ul><div class="hint-container warning"><p class="hint-container-title">경고</p><p>nonce는 application의 인식값입니다. 지정하지 않고 해당 ec2에서 실행된다면 다음의 명령어로 확인하여야 합니다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#vault read auth/ung/identity-accesslist/instance-id</span></span>
<span class="line">$ vault <span class="token builtin class-name">read</span> auth/ung/identity-accesslist/i-044a58e2f2c812e70</span>
<span class="line"></span>
<span class="line">Key                          Value</span>
<span class="line">---                          -----</span>
<span class="line">client_nonce                 vault-spring-boot-ec2</span>
<span class="line">creation_time                <span class="token number">2024</span>-08-17T05:03:54.352543462Z</span>
<span class="line">disallow_reauthentication    <span class="token boolean">false</span></span>
<span class="line">expiration_time              <span class="token number">2024</span>-10-04T04:28:32.766397546Z</span>
<span class="line">last_updated_time            <span class="token number">2024</span>-09-02T04:28:32.766397546Z</span>
<span class="line">pending_time                 <span class="token number">2024</span>-09-02T01:24:19Z</span>
<span class="line">role                         aws-spring-boot</span>
<span class="line"></span></code></pre></div></div><div class="language-yaml" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">thymeleaf</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">check-template-location</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">prefix</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>/templates/</span>
<span class="line">    <span class="token key atrule">suffix</span><span class="token punctuation">:</span> .html</span>
<span class="line">    <span class="token key atrule">mode</span><span class="token punctuation">:</span> HTML</span>
<span class="line">    <span class="token key atrule">encoding</span><span class="token punctuation">:</span> UTF<span class="token punctuation">-</span><span class="token number">8</span></span>
<span class="line">    <span class="token key atrule">content-type</span><span class="token punctuation">:</span> text/html</span>
<span class="line">    <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">devtools</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">livereload</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">cloud</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">bootstrap</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">vault</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">host</span><span class="token punctuation">:</span> vault_URL</span>
<span class="line">      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8200</span></span>
<span class="line">      <span class="token key atrule">scheme</span><span class="token punctuation">:</span> https</span>
<span class="line">      <span class="token key atrule">namespace</span><span class="token punctuation">:</span> admin</span>
<span class="line">      <span class="token comment">#인증을 AWS EC2에 Tag기반으로 합니다.</span></span>
<span class="line">      <span class="token key atrule">authentication</span><span class="token punctuation">:</span> AWS_EC2</span>
<span class="line">      <span class="token key atrule">aws-ec2</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">aws-ec2-path</span><span class="token punctuation">:</span> aws</span>
<span class="line">        <span class="token comment">#위에서 만든 ec2 tag의 role명을 명시합니다.</span></span>
<span class="line">        <span class="token key atrule">role</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>spring<span class="token punctuation">-</span>boot<span class="token punctuation">-</span>ec2</span>
<span class="line">        <span class="token key atrule">nonce</span><span class="token punctuation">:</span> vault<span class="token punctuation">-</span>spring<span class="token punctuation">-</span>boot<span class="token punctuation">-</span>ec2</span>
<span class="line">      <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">          <span class="token key atrule">min-renewal</span><span class="token punctuation">:</span> 10s</span>
<span class="line">          <span class="token key atrule">renew-interval</span><span class="token punctuation">:</span> 10s</span>
<span class="line">      <span class="token key atrule">kv</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">        <span class="token key atrule">backend</span><span class="token punctuation">:</span> kv_example</span>
<span class="line">        <span class="token key atrule">profile-separator</span><span class="token punctuation">:</span> /</span>
<span class="line">      <span class="token key atrule">application-name</span><span class="token punctuation">:</span> java_and_vault</span>
<span class="line">      <span class="token key atrule">profiles</span><span class="token punctuation">:</span> dev</span>
<span class="line">      <span class="token key atrule">generic</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">import</span><span class="token punctuation">:</span> vault<span class="token punctuation">:</span>//</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">logging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">level</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">org.springframework.vault</span><span class="token punctuation">:</span> TRACE</span>
<span class="line">    <span class="token key atrule">org.springframework.cloud.vault</span><span class="token punctuation">:</span> TRACE</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Vault Path Info</span></span>
<span class="line"><span class="token comment"># /{backend}/{default-context}</span></span>
<span class="line"><span class="token comment"># /{backend}/{default-context}/{profiles}</span></span>
<span class="line"><span class="token comment"># /{backend}/{application-name}</span></span>
<span class="line"><span class="token comment"># /{backend}/{application-name}/{profiles}</span></span>
<span class="line"></span></code></pre></div><ol start="5"><li>적용 확인</li></ol><ul><li><p>4번까지 설정을 하였다면 사실 EC2의 적용하는 것은 어렵지 않을 것입니다.</p></li><li><p>먼저 IAM 적용입니다. 배포하려는 ec2에 IAM을 attch하면 됩니다.<br><img src="`+t+'" alt="" loading="lazy"></p></li><li><p>다음으로는 ec2 tag입니다. 배포하려는 ec2에 tag에는 &quot;svc_type&quot; value에는 vault_ec2_tag의 output값을 넣어줍니다.<br><img src="'+e+'" alt="" loading="lazy"></p></li><li><p>ec2에서는 아래와 같이 결과를 확인할 수 있습니다.<br><img src="'+l+'" alt="" loading="lazy"></p></li></ul>',21),u=[c];function i(r,k){return s(),a("div",null,u)}const m=n(o,[["render",i],["__file","spring-boot-with-vault.html.vue"]]),d=JSON.parse('{"path":"/04-HashiCorp/06-Vault/04-UseCase/spring-boot-with-vault.html","title":"Vault로 Spring Boot 구성관리 aws-auth Version","lang":"ko-KR","frontmatter":{"head":[["meta",{"name":"Spring Boot Vault aws-auth Version","content":"Spring Boot에 구성관리로 Vault 사용 aws-auth Version"}],["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot-with-vault.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Vault로 Spring Boot 구성관리 aws-auth Version"}],["meta",{"property":"og:description","content":"Vault로 Spring Boot 구성관리 aws-auth Version token, app-role로 관리: docmoa Spring boot에서는 Token, App-role을 제외하고 aws-auth를 통해서도 Secret을 주입 할 수 있습니다. aws-auth에서는 다음의 두 기능을 지원합니다. AWS IA..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-09-04T14:40:47.000Z"}],["meta",{"property":"article:author","content":"unghee"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"spring"}],["meta",{"property":"article:tag","content":"aws-auth"}],["meta",{"property":"article:modified_time","content":"2024-09-04T14:40:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vault로 Spring Boot 구성관리 aws-auth Version\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-04T14:40:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"unghee\\"}]}"]],"author":"unghee","tag":["vault","java","spring","aws-auth"],"description":"Vault로 Spring Boot 구성관리 aws-auth Version token, app-role로 관리: docmoa Spring boot에서는 Token, App-role을 제외하고 aws-auth를 통해서도 Secret을 주입 할 수 있습니다. aws-auth에서는 다음의 두 기능을 지원합니다. AWS IA..."},"headers":[],"git":{"createdTime":1725444002000,"updatedTime":1725460847000,"contributors":[{"name":"ung","email":"ung@mz.co.kr","commits":3},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":10.33,"words":620},"filePathRelative":"04-HashiCorp/06-Vault/04-UseCase/spring-boot-with-vault.md","localizedDate":"2024년 9월 4일","excerpt":"\\n<blockquote>\\n<p>token, app-role로 관리: <a href=\\"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/spring-boot.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">docmoa</a></p>\\n</blockquote>\\n<p>Spring boot에서는 Token, App-role을 제외하고 aws-auth를 통해서도 Secret을 주입 할 수 있습니다.<br>\\naws-auth에서는 다음의 두 기능을 지원합니다.</p>","copyright":{"author":"unghee"},"autoDesc":true}');export{m as comp,d as data};
