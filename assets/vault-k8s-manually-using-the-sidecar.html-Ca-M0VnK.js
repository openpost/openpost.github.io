import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const l={},i=e(`<h1 id="kubernetes에-vault-agent-sidecar-수동-구성" tabindex="-1"><a class="header-anchor" href="#kubernetes에-vault-agent-sidecar-수동-구성"><span>Kubernetes에 Vault Agent(Sidecar) 수동 구성</span></a></h1><p>Kubernetes(K8s)환경에서 외부 Vault(External Vault Server)와 연계하는 경우 일반적으로 <code>kubernetes</code> 인증방식을 활용하여 Vault와 K8s 간 플랫폼 수준에서의 인증을 처리하나, K8s로의 Cluster API에 대한 inbound가 막혀있는 경우 이같은 방식은 사용할 수 없다. 따라서 <code>helm</code>, <code>vso</code> 같은 방식의 사용이 불가능하므로 Vault Agent를 Sidecar로 함께 배포하는 경우 수동으로 구성해주어야 한다.</p><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/picgo/Monosnap Samsung MX - Multicloud - Vault | onemodel 2023-12-04 11-55-09.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="hint-container tip"><p class="hint-container-title">팁</p><p>구성 과정은 Vault Agent를 BM/VM 환경에 구성하는 방식과 유사하며, 관련 구성 파일과 인증을 위한 정보를 Kubernetes 리소스를 활용한다는 차이가 있다.</p></div><p>테스트를 위한 Secret Engine은 <code>kv-v2</code> 이며, <code>/secret</code> 경로에 할당하였다.</p><details class="hint-container details"><summary>Secret Example</summary><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault secrets <span class="token builtin class-name">enable</span> <span class="token parameter variable">-version</span><span class="token operator">=</span><span class="token number">2</span> <span class="token parameter variable">-path</span><span class="token operator">=</span>secret kv</span>
<span class="line"></span>
<span class="line">vault kv put secret/my-k8s-secret <span class="token assign-left variable">foo</span><span class="token operator">=</span>my-k8s-secret-data</span>
<span class="line"></span>
<span class="line">vault policy <span class="token function">write</span> my-secret - <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">path &quot;secret/data/my-k8s-secret&quot; {</span>
<span class="line">  capabilities = [&quot;read&quot;]</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre></div></details><h2 id="_1-approle-인증-방식" tabindex="-1"><a class="header-anchor" href="#_1-approle-인증-방식"><span>1. Approle 인증 방식</span></a></h2><p>AppRole 인증방식을 활성화 한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault auth <span class="token builtin class-name">enable</span> approle</span>
<span class="line"></span></code></pre></div><p>AppRole의 <code>role</code>을 생성한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault <span class="token function">write</span> auth/approle/role/k8s-role <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token assign-left variable">secret_id_ttl</span><span class="token operator">=</span>10m <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token assign-left variable">token_ttl</span><span class="token operator">=</span>60m <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token assign-left variable">token_max_ttl</span><span class="token operator">=</span>120m <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token assign-left variable">policies</span><span class="token operator">=</span>my-secret</span>
<span class="line"></span></code></pre></div><p><code>role_id</code>를 확인한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault <span class="token builtin class-name">read</span> auth/approle/role/k8s-role/role-id</span>
<span class="line"></span></code></pre></div><p><code>role_id</code>와 <code>secret_id</code>를 K8s의 Secret에 저장한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># kubectl create secret generic vault-approle --from-literal=role_id=&lt;role-id-1234&gt; --from-literal=secret_id=&lt;s.1234567890abcdef&gt;</span></span>
<span class="line">kubectl create secret generic vault-approle <span class="token punctuation">\\</span></span>
<span class="line">  --from-literal<span class="token operator">=</span>role_id<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>vault <span class="token builtin class-name">read</span> <span class="token parameter variable">-field</span><span class="token operator">=</span>role_id auth/approle/role/k8s-role/role-id<span class="token variable">)</span></span> <span class="token punctuation">\\</span></span>
<span class="line">  --from-literal<span class="token operator">=</span>secret_id<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>vault <span class="token function">write</span> <span class="token parameter variable">-force</span> <span class="token parameter variable">-field</span><span class="token operator">=</span>secret_id auth/approle/role/k8s-role/secret-id<span class="token variable">)</span></span></span>
<span class="line"></span></code></pre></div><p>AppRole로 인증하는 Vault Agent를 위한 구성 파일을 <code>vault-agent-config.hcl</code>에 설정한다. ConfigMap에 저장한다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> kubectl create configmap vault-agent-config --from-file<span class="token operator">=</span>agent-config.hcl<span class="token operator">=</span>/dev/stdin</span></span>
<span class="line">vault {</span>
<span class="line">  address = &quot;http://10.100.11.233:8200&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">auto_auth {</span>
<span class="line">  method &quot;approle&quot; {</span>
<span class="line">    config = {</span>
<span class="line">      role_id_file_path = &quot;/etc/vault/approle/role_id&quot;</span>
<span class="line">      secret_id_file_path = &quot;/etc/vault/approle/secret_id&quot;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  sink &quot;file&quot; {</span>
<span class="line">    config = {</span>
<span class="line">      path = &quot;/etc/vault-agent-token/token&quot;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">template_config {</span>
<span class="line">	static_secret_render_interval = &quot;20s&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">template {</span>
<span class="line">  destination = &quot;/etc/secrets/index.html&quot;</span>
<span class="line">  contents = &lt;&lt;EOH</span>
<span class="line">  &lt;html&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">  &lt;p&gt;Secret Value: {{ with secret &quot;secret/data/my-k8s-secret&quot; }}{{ .Data.data.foo }}{{ end }}&lt;/p&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">  &lt;/html&gt;</span>
<span class="line">  EOH</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AppRole ID과 SecretID, Vault Agent Config 를 사용하는 샘플 앱을 실행한다. 다음은 Nginx를 사용한 Deployment Yaml의 예이다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl apply <span class="token parameter variable">-f</span> - <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: nginx-vault-demo</span>
<span class="line">spec:</span>
<span class="line">  replicas: 1</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: nginx-vault-demo</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      labels:</span>
<span class="line">        app: nginx-vault-demo</span>
<span class="line">    spec:</span>
<span class="line">      containers:</span>
<span class="line">      - name: nginx</span>
<span class="line">        image: nginx:latest</span>
<span class="line">        ports:</span>
<span class="line">        - containerPort: 80</span>
<span class="line">        volumeMounts:</span>
<span class="line">        - name: html-volume</span>
<span class="line">          mountPath: /usr/share/nginx/html</span>
<span class="line">      - name: vault-agent-sidecar</span>
<span class="line">        image: hashicorp/vault:latest</span>
<span class="line">        args:</span>
<span class="line">          - &quot;agent&quot;</span>
<span class="line">          - &quot;-config=/etc/vault/agent-config.hcl&quot;</span>
<span class="line">        volumeMounts:</span>
<span class="line">        - name: vault-agent-config</span>
<span class="line">          mountPath: /etc/vault</span>
<span class="line">        - name: vault-approle</span>
<span class="line">          mountPath: /etc/vault/approle</span>
<span class="line">        - name: vault-token</span>
<span class="line">          mountPath: /etc/vault-agent-token</span>
<span class="line">        - name: html-volume</span>
<span class="line">          mountPath: /etc/secrets</span>
<span class="line">      volumes:</span>
<span class="line">      - name: vault-agent-config</span>
<span class="line">        configMap:</span>
<span class="line">          name: vault-agent-config</span>
<span class="line">      - name: vault-approle</span>
<span class="line">        secret:</span>
<span class="line">          secretName: vault-approle</span>
<span class="line">      - name: vault-token</span>
<span class="line">        emptyDir: {}</span>
<span class="line">      - name: html-volume</span>
<span class="line">        emptyDir: {}</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Nginx의 Service를 등록한다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl apply <span class="token parameter variable">-f</span> - <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Service</span>
<span class="line">metadata:</span>
<span class="line">  name: nginx-service</span>
<span class="line">spec:</span>
<span class="line">  selector:</span>
<span class="line">    app: nginx-vault-demo</span>
<span class="line">  ports:</span>
<span class="line">    - protocol: TCP</span>
<span class="line">      port: 80</span>
<span class="line">      targetPort: 80</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>port-forward</code>를 이용하여 Nginx에서 정상적으로 랜더링된 vault의 시크릿을 포함한 페이지가 나타나는지 확인한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl port-forward <span class="token variable"><span class="token variable">$(</span>kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx-vault-demo <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token number">8080</span>:80</span>
<span class="line"></span></code></pre></div><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/picgo/image-20231204105453607.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Vault Agent 구성파일에서 <code>static_secret_render_interval</code>에 대한 정의가 있으므로, 20s 간격마다 변경된 KV 값으로 랜더링하는지 확인해본다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault kv put secret/my-k8s-secret <span class="token assign-left variable">foo</span><span class="token operator">=</span>my-k8s-secret-data-v2</span>
<span class="line"></span></code></pre></div><p>Pod 내의 <code>vault-agent-sidecar</code> 로그에 <code>rendered</code> 로그가 기록된다.</p><div class="language-log" data-highlighter="prismjs" data-ext="log" data-title="log"><pre class="language-log"><code><span class="line">│ <span class="token date number">2023-12-04T</span><span class="token time number">02:01:51.992Z</span> <span class="token punctuation">[</span><span class="token level info keyword">INFO</span><span class="token punctuation">]</span> <span class="token operator">(</span>runner<span class="token operator">)</span> rendered <span class="token string">&quot;(dynamic)&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;/etc/secrets/index.html&quot;</span></span>
<span class="line"></span></code></pre></div><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/picgo/image-20231204110230042.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-cloud-provider-인증-방식-e-g-aws-auth" tabindex="-1"><a class="header-anchor" href="#_2-cloud-provider-인증-방식-e-g-aws-auth"><span>2. Cloud Provider 인증 방식(e.g. AWS Auth)</span></a></h2><p>범용적인 AppRole 대신 Cloud Provider와의 인증 방식(여기서는 AWS 인증 방식)을 사용하여 Vault와 통신하는 구성을 적용할 수 있다.</p><p>EKS의 경우, EKS에 배포되는 Vault Agent는 AWS Role을 확인 가능하므로, AWS 인증 방식은 Vault가 AWS의 IAM 자격증명을 사용하여 인증을 수행하게 된다.</p><p>Vault AWS 인증 방식을 사용하기 위해서는 사전에 Vault AWS 인증에 사용할 Role이 필요하다.(아래는 Terraform으로의 구성 예제이다.)</p><details class="hint-container details"><summary>AWS Role create - Terraform Example</summary><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line"><span class="token keyword">provider<span class="token type variable"> &quot;aws&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">region</span> <span class="token punctuation">=</span> <span class="token string">&quot;ap-northeast-2&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;aws_iam_role&quot;</span></span> <span class="token string">&quot;eks_vault_auth_role&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;eks-vault-auth-role&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">assume_role_policy</span> <span class="token punctuation">=</span> jsonencode(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">Version</span> <span class="token punctuation">=</span> <span class="token string">&quot;2012-10-17&quot;</span>,</span>
<span class="line">    <span class="token property">Statement</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">Action</span> <span class="token punctuation">=</span> <span class="token string">&quot;sts:AssumeRole&quot;</span>,</span>
<span class="line">        <span class="token property">Effect</span> <span class="token punctuation">=</span> <span class="token string">&quot;Allow&quot;</span>,</span>
<span class="line">        <span class="token property">Principal</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token property">Service</span> <span class="token punctuation">=</span> <span class="token string">&quot;ec2.amazonaws.com&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Vault에 접근할 수 있는 역할에 대한 정책 (필요에 따라 수정)</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">&quot;aws_iam_role_policy&quot;</span></span> <span class="token string">&quot;vault_access&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;VaultAccess&quot;</span></span>
<span class="line">  <span class="token property">role</span> <span class="token punctuation">=</span> aws_iam_role.eks_vault_auth_role.id</span>
<span class="line"></span>
<span class="line">  <span class="token property">policy</span> <span class="token punctuation">=</span> jsonencode(<span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">Version</span> <span class="token punctuation">=</span> <span class="token string">&quot;2012-10-17&quot;</span>,</span>
<span class="line">    <span class="token property">Statement</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">Action</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;ec2:DescribeInstances&quot;</span>,</span>
<span class="line">          <span class="token string">&quot;ec2:DescribeTags&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span>,</span>
<span class="line">        <span class="token property">Effect</span>   <span class="token punctuation">=</span> <span class="token string">&quot;Allow&quot;</span>,</span>
<span class="line">        <span class="token property">Resource</span> <span class="token punctuation">=</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span>)</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">output<span class="token type variable"> &quot;role_arn&quot; </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">value</span> <span class="token punctuation">=</span> aws_iam_role.eks_vault_auth_role.arn</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Vault 서버에서 AWS 인증 방식을 활성화한다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">vault auth <span class="token builtin class-name">enable</span> aws</span>
<span class="line"></span></code></pre></div><p>AWS 역할을 생성하고, 해당 역할에 적절한 정책을 할당한다. 이 역할은 EKS에서 실행되는 서비스나 애플리케이션이 Vault에 인증할 때 사용된다. (terraform으로 생성한 경우 role_arn output에 출력된 결과를 <code>bound_iam_principal_arn</code>에 입력해준다.)</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">vault write auth/aws/role/k8s-role \\</span>
<span class="line">    auth_type=iam \\</span>
<span class="line">    bound_iam_principal_arn=&quot;arn:aws:iam::&lt;AWS_ACCOUNT_ID&gt;:role/&lt;EKS_ROLE_NAME&gt;&quot; \\</span>
<span class="line">    policies=my-secret \\</span>
<span class="line">    ttl=1h</span>
<span class="line"></span></code></pre></div><p>AWS로 인증하는 Vault Agent를 위한 구성 파일을 <code>vault-agent-config-aws.hcl</code>에 설정한다. ConfigMap에 저장한다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> kubectl create configmap vault-agent-config-aws --from-file<span class="token operator">=</span>agent-config.hcl<span class="token operator">=</span>/dev/stdin</span></span>
<span class="line">vault {</span>
<span class="line">  address = &quot;http://10.100.11.233:8200&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">auto_auth {</span>
<span class="line">  method &quot;aws&quot; {</span>
<span class="line">    mount_path = &quot;auth/aws&quot;</span>
<span class="line">    config = {</span>
<span class="line">      type = &quot;iam&quot;</span>
<span class="line">      role = &quot;k8s-role&quot;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  sink &quot;file&quot; {</span>
<span class="line">    config = {</span>
<span class="line">      path = &quot;/etc/vault-agent-token/token&quot;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">template_config {</span>
<span class="line">	static_secret_render_interval = &quot;20s&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">template {</span>
<span class="line">  destination = &quot;/etc/secrets/index.html&quot;</span>
<span class="line">  contents = &lt;&lt;EOH</span>
<span class="line">  &lt;html&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">  &lt;p&gt;Secret Value: {{ with secret &quot;secret/data/my-k8s-secret&quot; }}{{ .Data.data.foo }}{{ end }}&lt;/p&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">  &lt;/html&gt;</span>
<span class="line">  EOH</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Deployment는 다음과 같이 수정하여 적용한다. AppRole 구성에서의 관련 설정들이 제외된다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl apply <span class="token parameter variable">-f</span> - <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: nginx-vault-demo</span>
<span class="line">spec:</span>
<span class="line">  replicas: 1</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: nginx-vault-demo</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      labels:</span>
<span class="line">        app: nginx-vault-demo</span>
<span class="line">    spec:</span>
<span class="line">      containers:</span>
<span class="line">      - name: nginx</span>
<span class="line">        image: nginx:latest</span>
<span class="line">        ports:</span>
<span class="line">        - containerPort: 80</span>
<span class="line">        volumeMounts:</span>
<span class="line">        - name: html-volume</span>
<span class="line">          mountPath: /usr/share/nginx/html</span>
<span class="line">      - name: vault-agent-sidecar</span>
<span class="line">        image: hashicorp/vault:latest</span>
<span class="line">        args:</span>
<span class="line">          - &quot;agent&quot;</span>
<span class="line">          - &quot;-config=/etc/vault/agent-config.hcl&quot;</span>
<span class="line">        volumeMounts:</span>
<span class="line">        - name: vault-agent-config-aws</span>
<span class="line">          mountPath: /etc/vault</span>
<span class="line">        - name: vault-token</span>
<span class="line">          mountPath: /etc/vault-agent-token</span>
<span class="line">        - name: html-volume</span>
<span class="line">          mountPath: /etc/secrets</span>
<span class="line">      volumes:</span>
<span class="line">      - name: vault-agent-config</span>
<span class="line">        configMap:</span>
<span class="line">          name: vault-agent-config</span>
<span class="line">      - name: vault-token</span>
<span class="line">        emptyDir: {}</span>
<span class="line">      - name: html-volume</span>
<span class="line">        emptyDir: {}</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42),t=[i];function p(c,r){return n(),a("div",null,t)}const u=s(l,[["render",p],["__file","vault-k8s-manually-using-the-sidecar.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/06-Vault/04-UseCase/vault-k8s-manually-using-the-sidecar.html","title":"Kubernetes에 Vault Agent(Sidecar) 수동 구성","lang":"ko-KR","frontmatter":{"description":"Vault가 K8s Cluster API에 Inbound가 안되는 경우(보안 정책 때문에) Helm/VSO 구성이 불가능 하므로, 이 경우 수동으로 Sidecar를 붙여주거나 별도 Vault Agent/Proxy를 구성하여 Outbound로 처리하도록 해줘야 하는 경우가 발생한다.","tag":["vault","kubernetes"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/06-Vault/04-UseCase/vault-k8s-manually-using-the-sidecar.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Kubernetes에 Vault Agent(Sidecar) 수동 구성"}],["meta",{"property":"og:description","content":"Vault가 K8s Cluster API에 Inbound가 안되는 경우(보안 정책 때문에) Helm/VSO 구성이 불가능 하므로, 이 경우 수동으로 Sidecar를 붙여주거나 별도 Vault Agent/Proxy를 구성하여 Outbound로 처리하도록 해줘야 하는 경우가 발생한다."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/Great-Stone/images/master/picgo/Monosnap%20Samsung%20MX%20-%20Multicloud%20-%20Vault%20%7C%20onemodel%202023-12-04%2011-55-09.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-12-04T03:02:42.000Z"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"kubernetes"}],["meta",{"property":"article:modified_time","content":"2023-12-04T03:02:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kubernetes에 Vault Agent(Sidecar) 수동 구성\\",\\"image\\":[\\"https://raw.githubusercontent.com/Great-Stone/images/master/picgo/Monosnap%20Samsung%20MX%20-%20Multicloud%20-%20Vault%20%7C%20onemodel%202023-12-04%2011-55-09.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/picgo/image-20231204105453607.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/picgo/image-20231204110230042.png\\"],\\"dateModified\\":\\"2023-12-04T03:02:42.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.  Approle 인증 방식","slug":"_1-approle-인증-방식","link":"#_1-approle-인증-방식","children":[]},{"level":2,"title":"2. Cloud Provider 인증 방식(e.g. AWS Auth)","slug":"_2-cloud-provider-인증-방식-e-g-aws-auth","link":"#_2-cloud-provider-인증-방식-e-g-aws-auth","children":[]}],"git":{"createdTime":1701658962000,"updatedTime":1701658962000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":12.95,"words":777},"filePathRelative":"04-HashiCorp/06-Vault/04-UseCase/vault-k8s-manually-using-the-sidecar.md","localizedDate":"2023년 12월 4일","excerpt":"\\n<p>Kubernetes(K8s)환경에서 외부 Vault(External Vault Server)와 연계하는 경우 일반적으로 <code>kubernetes</code> 인증방식을 활용하여 Vault와 K8s 간 플랫폼 수준에서의 인증을 처리하나, K8s로의 Cluster API에 대한 inbound가 막혀있는 경우 이같은 방식은 사용할 수 없다. 따라서 <code>helm</code>, <code>vso</code> 같은 방식의 사용이 불가능하므로 Vault Agent를 Sidecar로 함께 배포하는 경우 수동으로 구성해주어야 한다.</p>"}');export{u as comp,v as data};
