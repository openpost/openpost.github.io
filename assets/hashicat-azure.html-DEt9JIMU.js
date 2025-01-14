import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const p={},l=e(`<h1 id="intro-to-terraform-on-azure" tabindex="-1"><a class="header-anchor" href="#intro-to-terraform-on-azure"><span>Intro to Terraform on Azure</span></a></h1><blockquote><p>본 글은 HashiCorp의 공식 워크샵인 &quot;Intro to Terraform on Azure&quot; 내용을 발췌하여 작성한 글입니다. <a href="https://hashicorp.github.io/field-workshops-terraform/slides/azure/terraform-oss/#1" target="_blank" rel="noopener noreferrer">참고</a></p><p>실습 원본 소스코드는 <a href="https://github.com/hashicorp/hashicat-azure" target="_blank" rel="noopener noreferrer">hashicat-azure 저장소</a>에서 확인할 수 있습니다.</p></blockquote><figure><img src="https://media.licdn.com/dms/image/C5612AQGhxYMwcjsNSQ/article-cover_image-shrink_600_2000/0/1643170479486?e=2147483647&amp;v=beta&amp;t=yHuifr0mLn3lU1D41ZJ_HvhJ6uDqcfkbxp2GjyRcdYo" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="azure-자격증명-설정" tabindex="-1"><a class="header-anchor" href="#azure-자격증명-설정"><span>Azure 자격증명 설정</span></a></h2><blockquote><p>자격증명 설정을 위한 상세 설명은 생략합니다.</p></blockquote><p>Terraform에서는 해당 CSP에서 리소스를 배포하기 위해 자격증명이 필요합니다. 자신의 Azure 구독정보를 연동하기 위해 credentials를 설정합니다.</p><ul><li>ARM_SUBSCRIPTION_ID</li><li>ARM_CLIENT_ID</li><li>ARM_CLIENT_SECRET</li><li>ARM_TENANT_ID</li><li>ARM_ENVIRONMENT (옵션)</li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> ARM</span>
<span class="line"><span class="token assign-left variable">ARM_CLIENT_ID</span><span class="token operator">=</span>xxx</span>
<span class="line"><span class="token assign-left variable">ARM_CLIENT_SECRET</span><span class="token operator">=</span>xxx</span>
<span class="line"><span class="token assign-left variable">ARM_SUBSCRIPTION_ID</span><span class="token operator">=</span>xxx</span>
<span class="line"><span class="token assign-left variable">ARM_TENANT_ID</span><span class="token operator">=</span>xxx</span>
<span class="line"></span></code></pre></div><h2 id="실습-시나리오1-azurerm-resource-group-생성" tabindex="-1"><a class="header-anchor" href="#실습-시나리오1-azurerm-resource-group-생성"><span>실습) 시나리오1. azurerm_resource_group 생성</span></a></h2><p>Azure에서는 기본적으로 리소스를 관리하기 위해 리소스 그룹을 생성해야 합니다. 이번 사니리오에서는 리소스 그룹을 생성해보겠습니다.</p><h3 id="hcl-구성파일" tabindex="-1"><a class="header-anchor" href="#hcl-구성파일"><span>HCL 구성파일</span></a></h3><ul><li><a href="http://main.tf" target="_blank" rel="noopener noreferrer">main.tf</a></li></ul><p>가장 기본이 되는 <code>main.tf</code> 코드의 구조는 다음과 같습니다.</p><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">terraform <span class="token punctuation">{</span></span>
<span class="line">  required_providers <span class="token punctuation">{</span></span>
<span class="line">    azurerm <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">      source  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;hashicorp/azurerm&quot;</span></span></span>
<span class="line">      version <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;=2.60.0&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">provider <span class="token string-literal"><span class="token string">&quot;azurerm&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  features <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_resource_group&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;myresourcegroup&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-workshop&quot;</span></span></span>
<span class="line">  location <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line">  </span>
<span class="line">  tags <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="http://variables.tf" target="_blank" rel="noopener noreferrer">variables.tf</a></li></ul><p>해당 샘플코드에서는 <code>prefix</code> 라는 변수만 필요하므로 다음과 같이 선언합니다.</p><div class="language-ruby" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">variable <span class="token string-literal"><span class="token string">&quot;prefix&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;This prefix will be included in the name of most resources.&quot;</span></span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;unknown&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ul><li>terraform.tfvars</li></ul><p>앞서 <code>variables.tf</code> 에서 <code>default = &quot;unknown&quot;</code> 으로 선언하였습니다. 이때, 사용자화된 값으로 대체하기 위해서 변수의 우선순위를 활용하여 덮어쓸 수 있습니다.</p><p>필자는 <code>terraform.tfvars</code> 파일을 사용하여 덮어쓰는 방식을 사용해보겠습니다.</p><div class="language-ruby" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line"><span class="token comment"># prefix에 자신의 이름을 작성하세요</span></span>
<span class="line">prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;hyungwook&quot;</span></span></span>
<span class="line"></span></code></pre></div><h3 id="테라폼-초기화-init" tabindex="-1"><a class="header-anchor" href="#테라폼-초기화-init"><span>테라폼 초기화(init)</span></a></h3><ul><li><code>terraform init</code> 명령을 통해 azurerm 프로바이더를 사용하기 위해 초기화를 진행합니다.</li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">terraform init</span>
<span class="line"></span></code></pre></div><p>초기화 명령 이후에 azurerm 에서 사용할 데이터가 <code>.terraform</code> 디렉토리 하위에 생성되었는지 확인합니다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">ls</span> .terraform/providers/registry.terraform.io/hashicorp</span>
<span class="line">azurerm</span>
<span class="line"></span></code></pre></div><h3 id="테라폼-계획-배포-plan-apply" tabindex="-1"><a class="header-anchor" href="#테라폼-계획-배포-plan-apply"><span>테라폼 계획 &amp; 배포(plan &amp; apply)</span></a></h3><ul><li><code>terraform plan</code> 명령을 통해 배포되기 전 계획을 확인합니다. 해당 실습에서는 최초 배포이므로 한 개의 리소스가 create 됩니다.</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">terraform plan</span>
<span class="line"></span>
<span class="line">Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:</span>
<span class="line">  + create</span>
<span class="line"></span>
<span class="line">Terraform will perform the following actions:</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># azurerm_resource_group.myresourcegroup will be created</span></span>
<span class="line">  + resource <span class="token string">&quot;azurerm_resource_group&quot;</span> <span class="token string">&quot;myresourcegroup&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      + <span class="token function">id</span>       <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + location <span class="token operator">=</span> <span class="token string">&quot;koreacentral&quot;</span></span>
<span class="line">      + name     <span class="token operator">=</span> <span class="token string">&quot;hyungwook-workshop&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">Plan: <span class="token number">1</span> to add, <span class="token number">0</span> to change, <span class="token number">0</span> to destroy.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>terraform apply</code> 명령을 통해 실제 리소스를 배포합니다.</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">terraform apply</span>
<span class="line"></span>
<span class="line">Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:</span>
<span class="line">  + create</span>
<span class="line"></span>
<span class="line">Terraform will perform the following actions:</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># azurerm_resource_group.myresourcegroup will be created</span></span>
<span class="line">  + resource <span class="token string">&quot;azurerm_resource_group&quot;</span> <span class="token string">&quot;myresourcegroup&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      + <span class="token function">id</span>       <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + location <span class="token operator">=</span> <span class="token string">&quot;koreacentral&quot;</span></span>
<span class="line">      + name     <span class="token operator">=</span> <span class="token string">&quot;hyungwook-workshop&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">Plan: <span class="token number">1</span> to add, <span class="token number">0</span> to change, <span class="token number">0</span> to destroy.</span>
<span class="line"></span>
<span class="line">Do you want to perform these actions?</span>
<span class="line">  Terraform will perform the actions described above.</span>
<span class="line">  Only <span class="token string">&#39;yes&#39;</span> will be accepted to approve.</span>
<span class="line"></span>
<span class="line">  Enter a value: <span class="token function">yes</span></span>
<span class="line"></span>
<span class="line">azurerm_resource_group.myresourcegroup: Creating<span class="token punctuation">..</span>.</span>
<span class="line">azurerm_resource_group.myresourcegroup: Creation complete after 5s <span class="token punctuation">[</span>id<span class="token operator">=</span>/subscriptions/0222cb06-f803-4f66-a922-a0957813a90c/resourceGroups/hyungwook-workshop<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="실습-시나리오-2-vnet-생성" tabindex="-1"><a class="header-anchor" href="#실습-시나리오-2-vnet-생성"><span>실습) 시나리오 2. vnet 생성</span></a></h2><p>시나리오 1에서 생성한 리소스 그룹에 vnet을 추가합니다.</p><h3 id="hcl-구성파일-1" tabindex="-1"><a class="header-anchor" href="#hcl-구성파일-1"><span>HCL 구성파일</span></a></h3><ul><li><a href="http://main.tf" target="_blank" rel="noopener noreferrer">main.tf</a></li></ul><p>앞서 사용했던 <code>main.tf</code> 파일에 다음과 같이 추가할 <code>azurerm_virtual_network</code> 절을 추가합니다.</p><div class="language-ruby" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line"><span class="token comment"># 생략</span></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_virtual_network&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;vnet&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-vnet&quot;</span></span></span>
<span class="line">  location            <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>location</span>
<span class="line">  address_space       <span class="token operator">=</span> <span class="token punctuation">[</span>var<span class="token punctuation">.</span>address_space<span class="token punctuation">]</span></span>
<span class="line">  resource_group_name <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ul><li><a href="http://variables.tf" target="_blank" rel="noopener noreferrer">variables.tf</a> 에서는 다음과 같은 두 가지 변수를 사용합니다. <ul><li><code>prefix</code> : 리소스의 가장 앞에 선언할 변수명</li><li><code>address_space</code> : 기본 CIDR 정의</li></ul></li></ul><div class="language-ruby" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">variable <span class="token string-literal"><span class="token string">&quot;prefix&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;This prefix will be included in the name of most resources.&quot;</span></span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;unknown&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;address_space&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The address space that is used by the virtual network. You can supply more than one address space. Changing this forces a new resource to be created.&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10.0.0.0/16&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="테라폼-계획-배포-plan-apply-1" tabindex="-1"><a class="header-anchor" href="#테라폼-계획-배포-plan-apply-1"><span>테라폼 계획 &amp; 배포(plan &amp; apply)</span></a></h3><p><code>azurerm_virtual_network</code> 리소스가 추가로 생성되는 것을 확인합니다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 생략</span></span>
<span class="line">Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:</span>
<span class="line">  + create</span>
<span class="line"></span>
<span class="line">Terraform will perform the following actions:</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># azurerm_virtual_network.vnet will be created</span></span>
<span class="line">  + resource <span class="token string">&quot;azurerm_virtual_network&quot;</span> <span class="token string">&quot;vnet&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      + address_space         <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">          + <span class="token string">&quot;10.0.0.0/16&quot;</span>,</span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      + guid                  <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + <span class="token function">id</span>                    <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + location              <span class="token operator">=</span> <span class="token string">&quot;koreacentral&quot;</span></span>
<span class="line">      + name                  <span class="token operator">=</span> <span class="token string">&quot;hyungwook-vnet&quot;</span></span>
<span class="line">      + resource_group_name   <span class="token operator">=</span> <span class="token string">&quot;hyungwook-workshop&quot;</span></span>
<span class="line">      + subnet                <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + vm_protection_enabled <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="실습-시나리오-3-subnet-security-group-생성" tabindex="-1"><a class="header-anchor" href="#실습-시나리오-3-subnet-security-group-생성"><span>실습) 시나리오 3. Subnet &amp; security group 생성</span></a></h2><p>이번 시나리오에서는 vnet 내부에 subnet과 security group을 추가로 생성해보겠습니다.</p><h3 id="hcl-구성파일-2" tabindex="-1"><a class="header-anchor" href="#hcl-구성파일-2"><span>HCL 구성파일</span></a></h3><ul><li><a href="http://main.tf" target="_blank" rel="noopener noreferrer">main.tf</a> 에서는 다음 두 가지 리소스를 추가로 생성하는 절을 추가합니다. <ul><li><code>azurerm_subnet</code></li><li><code>azurerm_network_security_group</code></li></ul></li></ul><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line"><span class="token comment"># 생략</span></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_subnet&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;subnet&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                 <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-subnet&quot;</span></span></span>
<span class="line">  virtual_network_name <span class="token operator">=</span> azurerm_virtual_network<span class="token punctuation">.</span>vnet<span class="token punctuation">.</span>name</span>
<span class="line">  resource_group_name  <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line">  address_prefixes     <span class="token operator">=</span> <span class="token punctuation">[</span>var<span class="token punctuation">.</span>subnet_prefix<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_network_security_group&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;catapp-sg&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-sg&quot;</span></span></span>
<span class="line">  location            <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line">  resource_group_name <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line"></span>
<span class="line">  security_rule <span class="token punctuation">{</span></span>
<span class="line">    name                       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;HTTP&quot;</span></span></span>
<span class="line">    priority                   <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">    direction                  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Inbound&quot;</span></span></span>
<span class="line">    access                     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Allow&quot;</span></span></span>
<span class="line">    protocol                   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tcp&quot;</span></span></span>
<span class="line">    source_port_range          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_port_range     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;80&quot;</span></span></span>
<span class="line">    source_address_prefix      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_address_prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  security_rule <span class="token punctuation">{</span></span>
<span class="line">    name                       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;HTTPS&quot;</span></span></span>
<span class="line">    priority                   <span class="token operator">=</span> <span class="token number">102</span></span>
<span class="line">    direction                  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Inbound&quot;</span></span></span>
<span class="line">    access                     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Allow&quot;</span></span></span>
<span class="line">    protocol                   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tcp&quot;</span></span></span>
<span class="line">    source_port_range          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_port_range     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;443&quot;</span></span></span>
<span class="line">    source_address_prefix      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_address_prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  security_rule <span class="token punctuation">{</span></span>
<span class="line">    name                       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;SSH&quot;</span></span></span>
<span class="line">    priority                   <span class="token operator">=</span> <span class="token number">101</span></span>
<span class="line">    direction                  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Inbound&quot;</span></span></span>
<span class="line">    access                     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Allow&quot;</span></span></span>
<span class="line">    protocol                   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tcp&quot;</span></span></span>
<span class="line">    source_port_range          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_port_range     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;22&quot;</span></span></span>
<span class="line">    source_address_prefix      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_address_prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="http://variables.tf" target="_blank" rel="noopener noreferrer">variables.tf</a> 에서는 <code>subnet_prerix</code> 절을 추가하여 서브넷의 CIDR을 선언합니다. <ul><li><code>prefix</code></li><li><code>address_space</code></li><li><strong><code>subnet_prefix</code></strong></li></ul></li></ul><div class="language-ruby" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">variable <span class="token string-literal"><span class="token string">&quot;subnet_prefix&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The address prefix to use for the subnet.&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10.0.10.0/24&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="테라폼-계획-배포-plan-apply-2" tabindex="-1"><a class="header-anchor" href="#테라폼-계획-배포-plan-apply-2"><span>테라폼 계획 &amp; 배포(plan &amp; apply)</span></a></h3><p>다음 두 리소스가 추가적으로 생성되는 것을 확인합니다.</p><ul><li>azurerm_network_security_group.catapp-sg</li><li>azurerm_subnet.subnet</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#(생략)</span></span>
<span class="line">Terraform will perform the following actions:</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># azurerm_network_security_group.catapp-sg will be created</span></span>
<span class="line">  + resource <span class="token string">&quot;azurerm_network_security_group&quot;</span> <span class="token string">&quot;catapp-sg&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      + <span class="token function">id</span>                  <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + location            <span class="token operator">=</span> <span class="token string">&quot;koreacentral&quot;</span></span>
<span class="line">      + name                <span class="token operator">=</span> <span class="token string">&quot;hyungwook-sg&quot;</span></span>
<span class="line">      + resource_group_name <span class="token operator">=</span> <span class="token string">&quot;hyungwook-workshop&quot;</span></span>
<span class="line">      + security_rule       <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">          + <span class="token punctuation">{</span></span>
<span class="line">              + access                                     <span class="token operator">=</span> <span class="token string">&quot;Allow&quot;</span></span>
<span class="line">              + description                                <span class="token operator">=</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">              + destination_address_prefix                 <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">              + destination_address_prefixes               <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">              + destination_application_security_group_ids <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">              + destination_port_range                     <span class="token operator">=</span> <span class="token string">&quot;22&quot;</span></span>
<span class="line">              + destination_port_ranges                    <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">              + direction                                  <span class="token operator">=</span> <span class="token string">&quot;Inbound&quot;</span></span>
<span class="line">              + name                                       <span class="token operator">=</span> <span class="token string">&quot;SSH&quot;</span></span>
<span class="line">              + priority                                   <span class="token operator">=</span> <span class="token number">101</span></span>
<span class="line">              + protocol                                   <span class="token operator">=</span> <span class="token string">&quot;Tcp&quot;</span></span>
<span class="line">              + source_address_prefix                      <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">              + source_address_prefixes                    <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">              + source_application_security_group_ids      <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">              + source_port_range                          <span class="token operator">=</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">              + source_port_ranges                         <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span>,</span>
<span class="line"><span class="token comment">#(중략)            </span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment"># azurerm_subnet.subnet will be created</span></span>
<span class="line">  + resource <span class="token string">&quot;azurerm_subnet&quot;</span> <span class="token string">&quot;subnet&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      + address_prefix                                 <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + address_prefixes                               <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">          + <span class="token string">&quot;10.0.10.0/24&quot;</span>,</span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      + enforce_private_link_endpoint_network_policies <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">      + enforce_private_link_service_network_policies  <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">      + <span class="token function">id</span>                                             <span class="token operator">=</span> <span class="token punctuation">(</span>known after apply<span class="token punctuation">)</span></span>
<span class="line">      + name                                           <span class="token operator">=</span> <span class="token string">&quot;hyungwook-subnet&quot;</span></span>
<span class="line">      + resource_group_name                            <span class="token operator">=</span> <span class="token string">&quot;hyungwook-workshop&quot;</span></span>
<span class="line">      + virtual_network_name                           <span class="token operator">=</span> <span class="token string">&quot;hyungwook-vnet&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">Plan: <span class="token number">2</span> to add, <span class="token number">0</span> to change, <span class="token number">0</span> to destroy.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="실습-시나리오-4-hashicat-웹-애플리케이션-배포" tabindex="-1"><a class="header-anchor" href="#실습-시나리오-4-hashicat-웹-애플리케이션-배포"><span>실습) 시나리오 4. hashicat 웹 애플리케이션 배포</span></a></h2><blockquote><p>참고 : 원본 소스코드는 <a href="https://github.com/hashicorp/hashicat-azure" target="_blank" rel="noopener noreferrer">hashicat-azure 저장소</a>에서 확인할 수 있습니다.</p></blockquote><p>이번 시나리오는 실제 VM 인스턴스에 초기화 스크립트를 사용하여 웹 애플리케이션을 배포해보도록 하겠습니다.</p><h3 id="hcl-구성파일-3" tabindex="-1"><a class="header-anchor" href="#hcl-구성파일-3"><span>HCL 구성파일</span></a></h3><ul><li><a href="http://main.tf" target="_blank" rel="noopener noreferrer">main.tf</a><ul><li><code>azurerm_network_interface</code> : Network Interface 생성</li><li><code>azurerm_network_interface_security_group_association</code> : Network Interface에 Security Group 할당</li><li><code>azurerm_public_ip</code> : 가상머신에 접속하기 위한 Public IP</li><li><code>azurerm_virtual_machine</code> : 가상머신</li><li><code>null_resource</code> : 가상머신 배포 후 <code>provisioner</code> 를 통해 웹 서비스 설치를 위해 사용</li></ul></li></ul><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">terraform <span class="token punctuation">{</span></span>
<span class="line">  required_providers <span class="token punctuation">{</span></span>
<span class="line">    azurerm <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">      source  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;hashicorp/azurerm&quot;</span></span></span>
<span class="line">      version <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;=2.60.0&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">provider <span class="token string-literal"><span class="token string">&quot;azurerm&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  features <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_resource_group&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;myresourcegroup&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-workshop&quot;</span></span></span>
<span class="line">  location <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line"></span>
<span class="line">  tags <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    environment <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Production&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_virtual_network&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;vnet&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-vnet&quot;</span></span></span>
<span class="line">  location            <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>location</span>
<span class="line">  address_space       <span class="token operator">=</span> <span class="token punctuation">[</span>var<span class="token punctuation">.</span>address_space<span class="token punctuation">]</span></span>
<span class="line">  resource_group_name <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_subnet&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;subnet&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                 <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-subnet&quot;</span></span></span>
<span class="line">  virtual_network_name <span class="token operator">=</span> azurerm_virtual_network<span class="token punctuation">.</span>vnet<span class="token punctuation">.</span>name</span>
<span class="line">  resource_group_name  <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line">  address_prefixes     <span class="token operator">=</span> <span class="token punctuation">[</span>var<span class="token punctuation">.</span>subnet_prefix<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_network_security_group&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;catapp-sg&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-sg&quot;</span></span></span>
<span class="line">  location            <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line">  resource_group_name <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line"></span>
<span class="line">  security_rule <span class="token punctuation">{</span></span>
<span class="line">    name                       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;HTTP&quot;</span></span></span>
<span class="line">    priority                   <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">    direction                  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Inbound&quot;</span></span></span>
<span class="line">    access                     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Allow&quot;</span></span></span>
<span class="line">    protocol                   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tcp&quot;</span></span></span>
<span class="line">    source_port_range          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_port_range     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;80&quot;</span></span></span>
<span class="line">    source_address_prefix      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_address_prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  security_rule <span class="token punctuation">{</span></span>
<span class="line">    name                       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;HTTPS&quot;</span></span></span>
<span class="line">    priority                   <span class="token operator">=</span> <span class="token number">102</span></span>
<span class="line">    direction                  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Inbound&quot;</span></span></span>
<span class="line">    access                     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Allow&quot;</span></span></span>
<span class="line">    protocol                   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tcp&quot;</span></span></span>
<span class="line">    source_port_range          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_port_range     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;443&quot;</span></span></span>
<span class="line">    source_address_prefix      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_address_prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  security_rule <span class="token punctuation">{</span></span>
<span class="line">    name                       <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;SSH&quot;</span></span></span>
<span class="line">    priority                   <span class="token operator">=</span> <span class="token number">101</span></span>
<span class="line">    direction                  <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Inbound&quot;</span></span></span>
<span class="line">    access                     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Allow&quot;</span></span></span>
<span class="line">    protocol                   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tcp&quot;</span></span></span>
<span class="line">    source_port_range          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_port_range     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;22&quot;</span></span></span>
<span class="line">    source_address_prefix      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">    destination_address_prefix <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;*&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_network_interface&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;catapp-nic&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-catapp-nic&quot;</span></span></span>
<span class="line">  location                  <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line">  resource_group_name       <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line"></span>
<span class="line">  ip_configuration <span class="token punctuation">{</span></span>
<span class="line">    name                          <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}ipconfig&quot;</span></span></span>
<span class="line">    subnet_id                     <span class="token operator">=</span> azurerm_subnet<span class="token punctuation">.</span>subnet<span class="token punctuation">.</span>id</span>
<span class="line">    private_ip_address_allocation <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Dynamic&quot;</span></span></span>
<span class="line">    public_ip_address_id          <span class="token operator">=</span> azurerm_public_ip<span class="token punctuation">.</span>catapp<span class="token operator">-</span>pip<span class="token punctuation">.</span>id</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_network_interface_security_group_association&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;catapp-nic-sg-ass&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  network_interface_id      <span class="token operator">=</span> azurerm_network_interface<span class="token punctuation">.</span>catapp<span class="token operator">-</span>nic<span class="token punctuation">.</span>id</span>
<span class="line">  network_security_group_id <span class="token operator">=</span> azurerm_network_security_group<span class="token punctuation">.</span>catapp<span class="token operator">-</span>sg<span class="token punctuation">.</span>id</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_public_ip&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;catapp-pip&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-ip&quot;</span></span></span>
<span class="line">  location            <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line">  resource_group_name <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line">  allocation_method   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Dynamic&quot;</span></span></span>
<span class="line">  domain_name_label   <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-meow&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;azurerm_virtual_machine&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;catapp&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  name                <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-meow&quot;</span></span></span>
<span class="line">  location            <span class="token operator">=</span> var<span class="token punctuation">.</span>location</span>
<span class="line">  resource_group_name <span class="token operator">=</span> azurerm_resource_group<span class="token punctuation">.</span>myresourcegroup<span class="token punctuation">.</span>name</span>
<span class="line">  vm_size             <span class="token operator">=</span> var<span class="token punctuation">.</span>vm_size</span>
<span class="line"></span>
<span class="line">  network_interface_ids         <span class="token operator">=</span> <span class="token punctuation">[</span>azurerm_network_interface<span class="token punctuation">.</span>catapp<span class="token operator">-</span>nic<span class="token punctuation">.</span>id<span class="token punctuation">]</span></span>
<span class="line">  delete_os_disk_on_termination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;true&quot;</span></span></span>
<span class="line"></span>
<span class="line">  storage_image_reference <span class="token punctuation">{</span></span>
<span class="line">    publisher <span class="token operator">=</span> var<span class="token punctuation">.</span>image_publisher</span>
<span class="line">    offer     <span class="token operator">=</span> var<span class="token punctuation">.</span>image_offer</span>
<span class="line">    sku       <span class="token operator">=</span> var<span class="token punctuation">.</span>image_sku</span>
<span class="line">    version   <span class="token operator">=</span> var<span class="token punctuation">.</span>image_version</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  storage_os_disk <span class="token punctuation">{</span></span>
<span class="line">    name              <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;\${var.prefix}-osdisk&quot;</span></span></span>
<span class="line">    managed_disk_type <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Standard_LRS&quot;</span></span></span>
<span class="line">    caching           <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;ReadWrite&quot;</span></span></span>
<span class="line">    create_option     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;FromImage&quot;</span></span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  os_profile <span class="token punctuation">{</span></span>
<span class="line">    computer_name  <span class="token operator">=</span> var<span class="token punctuation">.</span>prefix</span>
<span class="line">    admin_username <span class="token operator">=</span> var<span class="token punctuation">.</span>admin_username</span>
<span class="line">    admin_password <span class="token operator">=</span> var<span class="token punctuation">.</span>admin_password</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  os_profile_linux_config <span class="token punctuation">{</span></span>
<span class="line">    disable_password_authentication <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  tags <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Added to allow destroy to work correctly.</span></span>
<span class="line">  depends_on <span class="token operator">=</span> <span class="token punctuation">[</span>azurerm_network_interface_security_group_association<span class="token punctuation">.</span>catapp<span class="token operator">-</span>nic<span class="token operator">-</span>sg<span class="token operator">-</span>ass<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">resource <span class="token string-literal"><span class="token string">&quot;null_resource&quot;</span></span> <span class="token string-literal"><span class="token string">&quot;configure-cat-app&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  depends_on <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    azurerm_virtual_machine<span class="token punctuation">.</span>catapp<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Terraform 0.12</span></span>
<span class="line">  triggers <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    build_number <span class="token operator">=</span> timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  provisioner <span class="token string-literal"><span class="token string">&quot;file&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    source      <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;files/&quot;</span></span></span>
<span class="line">    destination <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;/home/\${var.admin_username}/&quot;</span></span></span>
<span class="line"></span>
<span class="line">    connection <span class="token punctuation">{</span></span>
<span class="line">      type     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;ssh&quot;</span></span></span>
<span class="line">      user     <span class="token operator">=</span> var<span class="token punctuation">.</span>admin_username</span>
<span class="line">      password <span class="token operator">=</span> var<span class="token punctuation">.</span>admin_password</span>
<span class="line">      host     <span class="token operator">=</span> azurerm_public_ip<span class="token punctuation">.</span>catapp<span class="token operator">-</span>pip<span class="token punctuation">.</span>fqdn</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  provisioner <span class="token string-literal"><span class="token string">&quot;remote-exec&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    inline <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;sudo apt -y update&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;sleep 15&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;sudo apt -y update&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;sudo apt -y install apache2&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;sudo systemctl start apache2&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;sudo chown -R \${var.admin_username}:\${var.admin_username} /var/www/html&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;chmod +x *.sh&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-literal"><span class="token string">&quot;PLACEHOLDER=\${var.placeholder} WIDTH=\${var.width} HEIGHT=\${var.height} PREFIX=\${var.prefix} ./deploy_app.sh&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    connection <span class="token punctuation">{</span></span>
<span class="line">      type     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;ssh&quot;</span></span></span>
<span class="line">      user     <span class="token operator">=</span> var<span class="token punctuation">.</span>admin_username</span>
<span class="line">      password <span class="token operator">=</span> var<span class="token punctuation">.</span>admin_password</span>
<span class="line">      host     <span class="token operator">=</span> azurerm_public_ip<span class="token punctuation">.</span>catapp<span class="token operator">-</span>pip<span class="token punctuation">.</span>fqdn</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="http://variables.tf" target="_blank" rel="noopener noreferrer">variables.tf</a><ul><li>설명생략</li></ul></li></ul><div class="language-ruby line-numbers-mode" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre class="language-ruby"><code><span class="line">variable <span class="token string-literal"><span class="token string">&quot;prefix&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;This prefix will be included in the name of most resources.&quot;</span></span></span>
<span class="line">  default <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;unknown&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;location&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The region where the virtual network is created.&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;eastus&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;address_space&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The address space that is used by the virtual network. You can supply more than one address space. Changing this forces a new resource to be created.&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10.0.0.0/16&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;subnet_prefix&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The address prefix to use for the subnet.&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10.0.10.0/24&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;vm_size&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Specifies the size of the virtual machine.&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Standard_B1s&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;image_publisher&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Name of the publisher of the image (az vm image list)&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Canonical&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;image_offer&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Name of the offer (az vm image list)&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;0001-com-ubuntu-server-jammy&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;image_sku&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Image SKU to apply (az vm image list)&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;22_04-LTS-gen2&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;image_version&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Version of the image to apply (az vm image list)&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;latest&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;admin_username&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Administrator user name for linux and mysql&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;hashicorp&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;admin_password&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Administrator password for linux and mysql&quot;</span></span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Password123!&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;height&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;400&quot;</span></span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Image height in pixels.&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;width&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;600&quot;</span></span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Image width in pixels.&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">variable <span class="token string-literal"><span class="token string">&quot;placeholder&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">  default     <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;placekitten.com&quot;</span></span></span>
<span class="line">  description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Image-as-a-service URL. Some other fun ones to try are fillmurray.com, placecage.com, placebeard.it, loremflickr.com, baconmockup.com, placeimg.com, placebear.com, placeskull.com, stevensegallery.com, placedog.net&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="테라폼-계획-배포-plan-apply-3" tabindex="-1"><a class="header-anchor" href="#테라폼-계획-배포-plan-apply-3"><span>테라폼 계획 &amp; 배포(plan &amp; apply)</span></a></h3><p><code>main.tf</code>에서 추가했던 각종 리소스가 추가적으로 배포되는 것을 확인합니다.<br> 해당 시나리오에서는 가상머신 생성 후 <code>null_resource</code> 리소스를 통해 아파치 웹 서버를 설치하는 과정이 포함되어 있으므로 3~5분정도 소요됩니다.</p><h3 id="결과-확인-output" tabindex="-1"><a class="header-anchor" href="#결과-확인-output"><span>결과 확인 : output</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 생략</span></span>
<span class="line">null_resource.configure-cat-app <span class="token punctuation">(</span>remote-exec<span class="token punctuation">)</span>: Script complete.</span>
<span class="line">null_resource.configure-cat-app: Creation complete after 31s <span class="token punctuation">[</span>id<span class="token operator">=</span><span class="token number">7198378208770846330</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">Apply complete<span class="token operator">!</span> Resources: <span class="token number">1</span> added, <span class="token number">0</span> changed, <span class="token number">1</span> destroyed.</span>
<span class="line"></span>
<span class="line">Outputs:</span>
<span class="line"></span>
<span class="line">catapp_url <span class="token operator">=</span> <span class="token string">&quot;http://hyungwook-meow.koreacentral.cloudapp.azure.com&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="결과확인-web-ui" tabindex="-1"><a class="header-anchor" href="#결과확인-web-ui"><span>결과확인 : WEB UI</span></a></h3><p><code>catapp_url</code> 을 통해 접속해본 결과 정상적으로 웹 애플리케이션이 배포되고 고양이 이미지를 출력하는 것을 확인할 수 있다.</p><figure><img src="https://github.com/hyungwook0221/img/blob/main/uPic/hashicat-azure.png?raw=true" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="정리" tabindex="-1"><a class="header-anchor" href="#정리"><span>정리</span></a></h2><p>본 실습을 통해서 간략하게 Azure의 azurerm 프로바이더를 통해 각종 리소스를 생성하는 방안을 알아보았습니다.<br> 잘못된 정보나 수정이 필요한 부분이 있다면 언제든 피드백 부탁드립니다!</p><blockquote><p>작성자 : 유형욱(<a href="mailto:hyungwook.yu@hashicorp.com" target="_blank" rel="noopener noreferrer">hyungwook.yu@hashicorp.com</a>)</p></blockquote>`,71),t=[l];function i(o,r){return n(),a("div",null,t)}const d=s(p,[["render",i],["__file","hashicat-azure.html.vue"]]),v=JSON.parse('{"path":"/04-HashiCorp/03-Terraform/03-Sample/hashicat-azure.html","title":"Intro to Terraform on Azure","lang":"ko-KR","frontmatter":{"description":"Intro to Terraform on Azure 핸즈온 워크샵 설명 및 코드분석","tag":["Terraform","Terraform on Azure","Azure","HashiCat","Terraform OSS","Terraform Cloud","Terraform Enterprise","Terraform 샘플","IaC"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/03-Terraform/03-Sample/hashicat-azure.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Intro to Terraform on Azure"}],["meta",{"property":"og:description","content":"Intro to Terraform on Azure 핸즈온 워크샵 설명 및 코드분석"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://media.licdn.com/dms/image/C5612AQGhxYMwcjsNSQ/article-cover_image-shrink_600_2000/0/1643170479486?e=2147483647&v=beta&t=yHuifr0mLn3lU1D41ZJ_HvhJ6uDqcfkbxp2GjyRcdYo"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Terraform"}],["meta",{"property":"article:tag","content":"Terraform on Azure"}],["meta",{"property":"article:tag","content":"Azure"}],["meta",{"property":"article:tag","content":"HashiCat"}],["meta",{"property":"article:tag","content":"Terraform OSS"}],["meta",{"property":"article:tag","content":"Terraform Cloud"}],["meta",{"property":"article:tag","content":"Terraform Enterprise"}],["meta",{"property":"article:tag","content":"Terraform 샘플"}],["meta",{"property":"article:tag","content":"IaC"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Intro to Terraform on Azure\\",\\"image\\":[\\"https://media.licdn.com/dms/image/C5612AQGhxYMwcjsNSQ/article-cover_image-shrink_600_2000/0/1643170479486?e=2147483647&v=beta&t=yHuifr0mLn3lU1D41ZJ_HvhJ6uDqcfkbxp2GjyRcdYo\\",\\"https://github.com/hyungwook0221/img/blob/main/uPic/hashicat-azure.png?raw=true\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Azure 자격증명 설정","slug":"azure-자격증명-설정","link":"#azure-자격증명-설정","children":[]},{"level":2,"title":"실습) 시나리오1. azurerm_resource_group 생성","slug":"실습-시나리오1-azurerm-resource-group-생성","link":"#실습-시나리오1-azurerm-resource-group-생성","children":[{"level":3,"title":"HCL 구성파일","slug":"hcl-구성파일","link":"#hcl-구성파일","children":[]},{"level":3,"title":"테라폼 초기화(init)","slug":"테라폼-초기화-init","link":"#테라폼-초기화-init","children":[]},{"level":3,"title":"테라폼 계획 & 배포(plan & apply)","slug":"테라폼-계획-배포-plan-apply","link":"#테라폼-계획-배포-plan-apply","children":[]}]},{"level":2,"title":"실습) 시나리오 2. vnet 생성","slug":"실습-시나리오-2-vnet-생성","link":"#실습-시나리오-2-vnet-생성","children":[{"level":3,"title":"HCL 구성파일","slug":"hcl-구성파일-1","link":"#hcl-구성파일-1","children":[]},{"level":3,"title":"테라폼 계획 & 배포(plan & apply)","slug":"테라폼-계획-배포-plan-apply-1","link":"#테라폼-계획-배포-plan-apply-1","children":[]}]},{"level":2,"title":"실습) 시나리오 3. Subnet & security group 생성","slug":"실습-시나리오-3-subnet-security-group-생성","link":"#실습-시나리오-3-subnet-security-group-생성","children":[{"level":3,"title":"HCL 구성파일","slug":"hcl-구성파일-2","link":"#hcl-구성파일-2","children":[]},{"level":3,"title":"테라폼 계획 & 배포(plan & apply)","slug":"테라폼-계획-배포-plan-apply-2","link":"#테라폼-계획-배포-plan-apply-2","children":[]}]},{"level":2,"title":"실습) 시나리오 4. hashicat 웹 애플리케이션 배포","slug":"실습-시나리오-4-hashicat-웹-애플리케이션-배포","link":"#실습-시나리오-4-hashicat-웹-애플리케이션-배포","children":[{"level":3,"title":"HCL 구성파일","slug":"hcl-구성파일-3","link":"#hcl-구성파일-3","children":[]},{"level":3,"title":"테라폼 계획 & 배포(plan & apply)","slug":"테라폼-계획-배포-plan-apply-3","link":"#테라폼-계획-배포-plan-apply-3","children":[]},{"level":3,"title":"결과 확인 : output","slug":"결과-확인-output","link":"#결과-확인-output","children":[]},{"level":3,"title":"결과확인 : WEB UI","slug":"결과확인-web-ui","link":"#결과확인-web-ui","children":[]}]},{"level":2,"title":"정리","slug":"정리","link":"#정리","children":[]}],"git":{"createdTime":1689414540000,"updatedTime":1695042774000,"contributors":[{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1},{"name":"Hyungwook Yu","email":"105044562+hyungwook0221@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":20.9,"words":1254},"filePathRelative":"04-HashiCorp/03-Terraform/03-Sample/hashicat-azure.md","localizedDate":"2023년 7월 15일","excerpt":"\\n<blockquote>\\n<p>본 글은 HashiCorp의 공식 워크샵인 \\"Intro to Terraform on Azure\\" 내용을 발췌하여 작성한 글입니다. <a href=\\"https://hashicorp.github.io/field-workshops-terraform/slides/azure/terraform-oss/#1\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">참고</a></p>\\n<p>실습 원본 소스코드는 <a href=\\"https://github.com/hashicorp/hashicat-azure\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">hashicat-azure 저장소</a>에서 확인할 수 있습니다.</p>\\n</blockquote>"}');export{d as comp,v as data};
