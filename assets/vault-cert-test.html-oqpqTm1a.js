import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as e,h as l}from"./app-DhMJQ1_3.js";const i="/assets/3073638458-De3TKAni.png?width=760",t="/assets/3073180663-fJ-ttSnF.png?width=760",r="/assets/3073278945-A8mCEMwz.png?width=760",c="/assets/3073540219-B62sUFRN.png?width=760",p="/assets/3073278963-DEr13G4r.png?width=760",d="/assets/3073246298-Bwf6nelV.png?width=760",u="/assets/3073311827-tOuIOnLc.png?width=760",v="/assets/3076358550-BsPipR3Q.png?width=760",a="/assets/3076489735-CXUxbYgM.png?width=760",C="/assets/3075051442-7X9Rb3XH.png?width=760",o="/assets/3076489746-BX7yfrdL.png?width=760",E="/assets/3076424567-DHLxtNxb.png?width=760",m="/assets/3076424575-DXXajgpx.png?width=760",b="/assets/3075051459-DUAk_V2L.png?width=760",h="/assets/3076589226-Bqhgq5nj.png?width=760",g="/assets/3076555196-DwOKjE-A.png?width=760",A="/assets/3076358579-DzCxgM3n.png?width=760",D="/assets/3076456740-CDVWfPhU.png?width=760",B="/assets/3074920237-BgQN2CFj.png?width=760",_={},f=l(`<h1 id="vault-사설-인증서-관리-테스트" tabindex="-1"><a class="header-anchor" href="#vault-사설-인증서-관리-테스트"><span><strong>Vault 사설 인증서 관리 테스트</strong></span></a></h1><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%82%AC%EC%A0%84%EC%A4%80%EB%B9%84%EC%82%AC%ED%95%AD">사전 준비 사항</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.vault%EC%82%AC%EC%84%A4%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A7%8C%EB%93%A4%EA%B8%B0">1. Vault 사설 인증서 만들기</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98%EC%84%A4%EC%A0%95">1.1 환경 변수 설정</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.1kubernetes%EC%97%90%EC%84%9C%EC%84%9C%EB%AA%85%ED%95%A0%ED%82%A4%EC%83%9D%EC%84%B1">1.1.1 Kubernetes에서 서명할 키 생성</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.2%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%84%9C%EB%AA%85%EC%9A%94%EC%B2%AD(csr)%EC%9D%84%EC%83%9D%EC%84%B1">1.1.2 인증서 서명 요청(CSR)을 생성</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.3csr%EC%9D%84%EC%83%9D%EC%84%B1">1.1.3 CSR을 생성</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.4csr.yaml%EC%83%9D%EC%84%B1">1.1.4 csr.yaml 생성</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.5csr.yaml%EB%B0%B0%ED%8F%AC">1.1.5 csr.yaml 배포</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.6csr%EC%9D%84%EC%8A%B9%EC%9D%B8%EC%9A%94%EC%B2%AD">1.1.6 CSR을 승인 요청</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.7%EC%8A%B9%EC%9D%B8%EC%83%81%ED%83%9C%ED%99%95%EC%9D%B8">1.1.7 승인 상태 확인</a></li></ul></li></ul></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.%ED%82%A4,%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%B0%8Fkubernetesca%EB%A5%BCkubernetessecret%EC%A0%80%EC%9E%A5">2. 키, 인증서 및 Kubernetes CA를 Kubernetes secret 저장</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.1crt%ED%8C%8C%EC%9D%BC%EC%83%9D%EC%84%B1">2.1 crt 파일 생성</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.2%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4ca%EC%84%A4%EC%A0%95%ED%8C%8C%EC%9D%BC">2.2 쿠버네티스 ca 설정 파일</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.3key,crt,ca%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%8B%9C%ED%81%AC%EB%A6%BF%EC%83%9D%EC%84%B1">2.3 key, crt, ca 인증서 시크릿 생성</a></li></ul></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.vaulttls%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%A0%81%EC%9A%A9">3. Vault tls 인증서 적용</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.1helmvalues.yaml%ED%8C%8C%EC%9D%BC">3.1 helm values.yaml 파일</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.2awsnlb%EB%A5%BC%ED%86%B5%ED%95%B4%EC%A0%91%EA%B7%BC%EC%9D%B8%EC%A6%9D%EC%84%9C%ED%99%95%EC%9D%B8">3.2 AWS NLB를 통해 접근 인증서 확인</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3acm%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A5%BC%ED%86%B5%ED%95%B4%EC%A0%91%EA%B7%BC">3.3 ACM 인증서를 통해 접근</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.1route53%EC%84%A4%EC%A0%95">3.3.1 Route53 설정</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.2%EB%A0%88%EC%BD%94%EB%93%9C%EC%83%9D%EC%84%B1">3.3.2 레코드 생성</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.3%EB%A0%88%EC%BD%94%EB%93%9C%EC%84%A4%EC%A0%95">3.3.3 레코드 설정</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.4aws%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A5%BC%ED%86%B5%ED%95%B4vaultui%EC%A0%91%EA%B7%BC">3.3.4 AWS 인증서를 통해 Vault UI 접근</a></li></ul></li></ul></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-4.awsprivateca%EB%A5%BC%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%83%9D%EC%84%B1">4. AWS Private Ca를 사용 하는 인증서 생성</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-4.1%EC%82%AC%EC%A0%84%EC%A4%80%EB%B9%84%EC%9A%94%EA%B1%B4">4.1 사전 준비 요건</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-4.2acm%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%83%9D%EC%84%B1">4.2 ACM 인증서 생성</a></li></ul></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-5.awsprivateca%EA%B8%B0%EB%B0%98%EC%9C%BC%EB%A1%9C%EC%83%9D%EC%84%B1%EB%90%9C%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A5%BCvault%EC%97%90%EC%A0%81%EC%9A%A9">5. AWS Private Ca 기반으로 생성 된 인증서를 Vault에 적용</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EA%B2%B0%EB%A1%A0">결론</a><ul><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%A7%84%ED%96%89%EB%B0%A9%EC%8B%9D">진행 방식</a></li><li><a href="#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%8C%80%EC%95%88">대안</a></li></ul></li></ul><h1 id="사전-준비-사항" tabindex="-1"><a class="header-anchor" href="#사전-준비-사항"><span><a name="vault인증서-사전준비사항"></a><strong>사전 준비 사항</strong></span></a></h1><ul><li>k8s 환경 <ul><li>NLB 설치</li><li>AWS ENS CSI Driver</li><li>AWS Load Balancer Controller</li></ul></li><li>Vault 라이선스</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">touch vault.hclic =&gt; vault 라이센스 내용 첨부</span>
<span class="line"></span>
<span class="line">vaultsecret=$(cat vault.hclic)</span>
<span class="line"></span>
<span class="line">kubectl create secret generic vault-ent-license --from-literal=&quot;license=\${vaultsecret}&quot;</span>
<span class="line"></span></code></pre></div><ul><li>eks 자격증명 secret 생성</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">kubectl create secret generic eks-creds \\</span>
<span class="line">    --from-literal=AWS_ACCESS_KEY_ID=&quot;[AWS_ACCESS_KEY_ID]&quot; \\</span>
<span class="line">    --from-literal=AWS_SECRET_ACCESS_KEY=&quot;[AWS_SECRET_ACCESS_KEY]&quot;</span>
<span class="line"></span></code></pre></div><ul><li>helm 설치 및 vault repo add</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 &gt; get_helm.sh</span>
<span class="line">chmod 700 get_helm.sh</span>
<span class="line">./get_helm.sh</span>
<span class="line"></span>
<span class="line">curl -L https://git.io/get_helm.sh | bash -s -- --version v3.8.2</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">helm repo add hashicorp https://helm.releases.hashicorp.com</span>
<span class="line">helm repo list</span>
<span class="line"></span></code></pre></div><div class="hint-container caution"><p class="hint-container-title">위험</p><ul><li>AWS Private CA 요금<br> 참조: <a href="https://aws.amazon.com/ko/private-ca/pricing/" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/ko/private-ca/pricing/</a></li></ul></div><h1 id="_1-vault-사설-인증서-만들기" tabindex="-1"><a class="header-anchor" href="#_1-vault-사설-인증서-만들기"><span><a name="vault인증서-1.vault사설인증서만들기"></a><strong>1. Vault 사설 인증서 만들기</strong></span></a></h1><h2 id="_1-1-환경-변수-설정" tabindex="-1"><a class="header-anchor" href="#_1-1-환경-변수-설정"><span><a name="vault인증서-1.1환경변수설정"></a><strong>1.1 환경 변수 설정</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"># SERVICE is the name of the Vault service in Kubernetes.</span>
<span class="line">export SERVICE=vault</span>
<span class="line"></span>
<span class="line"># NAMESPACE where the Vault service is running.</span>
<span class="line">export NAMESPACE=default</span>
<span class="line"></span>
<span class="line"># SECRET_NAME to create in the Kubernetes secrets store.</span>
<span class="line">export SECRET_NAME=vault-tls</span>
<span class="line"></span>
<span class="line"># TMPDIR is a temporary working directory.</span>
<span class="line">export TMPDIR=/home/ec2-user/tls-vault</span>
<span class="line"></span>
<span class="line"># certificate request</span>
<span class="line">export CSR_NAME=vault-csr</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-1-kubernetes에서-서명할-키-생성" tabindex="-1"><a class="header-anchor" href="#_1-1-1-kubernetes에서-서명할-키-생성"><span><a name="vault인증서-1.1.1kubernetes에서서명할키생성"></a><strong>1.1.1 Kubernetes에서 서명할 키 생성</strong></span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">openssl genrsa -out \${TMPDIR}/vault.key 2048</span>
<span class="line"></span></code></pre></div><h3 id="_1-1-2-인증서-서명-요청-csr-을-생성" tabindex="-1"><a class="header-anchor" href="#_1-1-2-인증서-서명-요청-csr-을-생성"><span><a name="vault인증서-1.1.2인증서서명요청(csr)을생성"></a><strong>1.1.2 인증서 서명 요청(CSR)을 생성</strong></span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">cat &lt;&lt;EOF &gt;\${TMPDIR}/csr.conf</span>
<span class="line"></span>
<span class="line">[req]</span>
<span class="line">default_bits = 2048</span>
<span class="line">prompt = no</span>
<span class="line">encrypt_key = yes</span>
<span class="line">default_md = sha256</span>
<span class="line">req_extensions = v3_req</span>
<span class="line">distinguished_name = req_distinguished_name</span>
<span class="line">[req_distinguished_name]</span>
<span class="line">emailAddress = admin@admin.dev</span>
<span class="line">CN = \${SERVICE}.\${NAMESPACE}.svc</span>
<span class="line">[ v3_req ]</span>
<span class="line">basicConstraints = CA:FALSE</span>
<span class="line">keyUsage = nonRepudiation, digitalSignature, keyEncipherment</span>
<span class="line">extendedKeyUsage = serverAuth</span>
<span class="line">subjectAltName = @alt_names</span>
<span class="line">[alt_names]</span>
<span class="line">DNS.1 = \${SERVICE}</span>
<span class="line">DNS.2 = \${SERVICE}.\${NAMESPACE}</span>
<span class="line">DNS.3 = \${SERVICE}.\${NAMESPACE}.svc</span>
<span class="line">DNS.4 = \${SERVICE}.\${NAMESPACE}.svc.cluster.local</span>
<span class="line">DNS.5 = \\*.vault-internal</span>
<span class="line">IP.1 = 127.0.0.1</span>
<span class="line">EOF</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-3-csr을-생성" tabindex="-1"><a class="header-anchor" href="#_1-1-3-csr을-생성"><span><a name="vault인증서-1.1.3csr을생성"></a><strong>1.1.3 CSR을 생성</strong></span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">openssl req -config \${TMPDIR}/csr.conf -new -key \${TMPDIR}/vault.key -subj &quot;/CN=\${SERVICE}.\${NAMESPACE}.svc&quot; -out \${TMPDIR}/server.csr</span>
<span class="line"></span></code></pre></div><h3 id="_1-1-4-csr-yaml-생성" tabindex="-1"><a class="header-anchor" href="#_1-1-4-csr-yaml-생성"><span><a name="vault인증서-1.1.4csr.yaml생성"></a><strong>1.1.4 csr.yaml 생성</strong></span></a></h3><div class="hint-container warning"><p class="hint-container-title">경고</p><figure><img src="`+i+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">cat &lt;&lt;EOF &gt;\${TMPDIR}/csr.yaml</span>
<span class="line"></span>
<span class="line">apiVersion: certificates.k8s.io/v1</span>
<span class="line">kind: CertificateSigningRequest</span>
<span class="line">metadata:</span>
<span class="line">   name: \${CSR_NAME}</span>
<span class="line">spec:</span>
<span class="line">   groups:</span>
<span class="line">   - system:authenticated</span>
<span class="line">   request: $(cat \${TMPDIR}/server.csr | base64 | tr -d &#39;\\n&#39;)</span>
<span class="line">   signerName: beta.eks.amazonaws.com/app-serving</span>
<span class="line">   usages:</span>
<span class="line">   - digital signature</span>
<span class="line">   - key encipherment</span>
<span class="line">   - server auth</span>
<span class="line">EOF</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-5-csr-yaml-배포" tabindex="-1"><a class="header-anchor" href="#_1-1-5-csr-yaml-배포"><span><a name="vault인증서-1.1.5csr.yaml배포"></a><strong>1.1.5 csr.yaml 배포</strong></span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">kubectl create -f \${TMPDIR}/csr.yaml</span>
<span class="line"></span>
<span class="line">- 승인(approve)이 되기 전까지 상태는 pending</span>
<span class="line"></span></code></pre></div><h3 id="_1-1-6-csr을-승인-요청" tabindex="-1"><a class="header-anchor" href="#_1-1-6-csr을-승인-요청"><span><a name="vault인증서-1.1.6csr을승인요청"></a><strong>1.1.6 CSR을 승인 요청</strong></span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">kubectl certificate approve \${CSR_NAME}</span>
<span class="line"></span></code></pre></div><h3 id="_1-1-7-승인-상태-확인" tabindex="-1"><a class="header-anchor" href="#_1-1-7-승인-상태-확인"><span><a name="vault인증서-1.1.7승인상태확인"></a><strong>1.1.7 승인 상태 확인</strong></span></a></h3><figure><img src="`+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_2-키-인증서-및-kubernetes-ca를-kubernetes-secret-저장" tabindex="-1"><a class="header-anchor" href="#_2-키-인증서-및-kubernetes-ca를-kubernetes-secret-저장"><span><a name="vault인증서-2.키,인증서및kubernetesca를kubernetessecret저장"></a><strong>2. 키, 인증서 및 Kubernetes CA를 Kubernetes secret 저장</strong></span></a></h1><h2 id="_2-1-crt-파일-생성" tabindex="-1"><a class="header-anchor" href="#_2-1-crt-파일-생성"><span><a name="vault인증서-2.1crt파일생성"></a><strong>2.1 crt 파일 생성</strong></span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">serverCert=$(kubectl get csr \${CSR_NAME} -o jsonpath=&quot;{.status.certificate}&quot;)</span>
<span class="line"></span>
<span class="line">echo &quot;\${serverCert}&quot; | openssl base64 -d -A -out \${TMPDIR}/vault.crt</span>
<span class="line"></span></code></pre></div><h2 id="_2-2-쿠버네티스-ca-설정-파일" tabindex="-1"><a class="header-anchor" href="#_2-2-쿠버네티스-ca-설정-파일"><span><a name="vault인증서-2.2쿠버네티스ca설정파일"></a><strong>2.2 쿠버네티스 ca 설정 파일</strong></span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">kubectl config view --raw --minify --flatten -o jsonpath=&#39;{.clusters[].cluster.certificate-authority-data}&#39; | base64 -d &gt; \${TMPDIR}/vault.ca</span>
<span class="line"></span></code></pre></div><h2 id="_2-3-key-crt-ca-인증서-시크릿-생성" tabindex="-1"><a class="header-anchor" href="#_2-3-key-crt-ca-인증서-시크릿-생성"><span><a name="vault인증서-2.3key,crt,ca인증서시크릿생성"></a><strong>2.3 key, crt, ca 인증서 시크릿 생성</strong></span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">kubectl create secret generic \${SECRET_NAME} \\</span>
<span class="line">   --namespace \${NAMESPACE} \\</span>
<span class="line">   --from-file=vault.key=\${TMPDIR}/vault.key \\</span>
<span class="line">   --from-file=vault.crt=\${TMPDIR}/vault.crt \\</span>
<span class="line">   --from-file=vault.ca=\${TMPDIR}/vault.ca</span>
<span class="line"></span></code></pre></div><h1 id="_3-vault-tls-인증서-적용" tabindex="-1"><a class="header-anchor" href="#_3-vault-tls-인증서-적용"><span><a name="vault인증서-3.vaulttls인증서적용"></a><strong>3. Vault tls 인증서 적용</strong></span></a></h1><h2 id="_3-1-helm-values-yaml-파일" tabindex="-1"><a class="header-anchor" href="#_3-1-helm-values-yaml-파일"><span><a name="vault인증서-3.1helmvalues.yaml파일"></a><strong>3.1 helm values.yaml 파일</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">global:</span>
<span class="line"></span>
<span class="line">    enabled: true</span>
<span class="line"></span>
<span class="line">    tlsDisable: false</span>
<span class="line"></span>
<span class="line">server:</span>
<span class="line"></span>
<span class="line">    enterpriseLicense:</span>
<span class="line">      secretName: vault-ent-license</span>
<span class="line"></span>
<span class="line">    extraVolumes:</span>
<span class="line"></span>
<span class="line">    - type: secret</span>
<span class="line"></span>
<span class="line">      name: vault-tls</span>
<span class="line"></span>
<span class="line">    extraEnvironmentVars:</span>
<span class="line"></span>
<span class="line">      VAULT_CACERT: &quot;/vault/userconfig/vault-tls/vault.ca&quot;</span>
<span class="line"></span>
<span class="line">      CA_CERT: &quot;/var/run/secrets/kubernetes.io/serviceaccount/ca.crt&quot;</span>
<span class="line"></span>
<span class="line">    ha:</span>
<span class="line"></span>
<span class="line">      enabled: true</span>
<span class="line">      raft:</span>
<span class="line"></span>
<span class="line">        enabled: true</span>
<span class="line"></span>
<span class="line">        setNodeId: true</span>
<span class="line"></span>
<span class="line">        config: |</span>
<span class="line"></span>
<span class="line">          ui = true</span>
<span class="line">          listener &quot;tcp&quot; {</span>
<span class="line"></span>
<span class="line">            tls_disable = 0</span>
<span class="line"></span>
<span class="line">            address = &quot;[::]:8200&quot;</span>
<span class="line"></span>
<span class="line">            cluster_address = &quot;[::]:8201&quot;</span>
<span class="line"></span>
<span class="line">            tls_cert_file = &quot;/vault/userconfig/vault-tls/vault.crt&quot;</span>
<span class="line"></span>
<span class="line">            tls_key_file  = &quot;/vault/userconfig/vault-tls/vault.key&quot;</span>
<span class="line"></span>
<span class="line">            tls_client_ca_file = &quot;/vault/userconfig/vault-tls/vault.ca&quot;</span>
<span class="line"></span>
<span class="line">          }</span>
<span class="line"></span>
<span class="line">          storage &quot;raft&quot; {</span>
<span class="line"></span>
<span class="line">            path = &quot;/vault/data&quot;</span>
<span class="line"></span>
<span class="line">            retry_join {</span>
<span class="line"></span>
<span class="line">              leader_api_addr = &quot;https://vault-0.vault-internal:8200&quot;</span>
<span class="line"></span>
<span class="line">              leader_ca_cert_file = &quot;/vault/userconfig/vault-tls/vault.ca&quot;</span>
<span class="line"></span>
<span class="line">              leader_client_cert_file = &quot;/vault/userconfig/vault-tls/vault.crt&quot;</span>
<span class="line"></span>
<span class="line">              leader_client_key_file = &quot;/vault/userconfig/vault-tls/vault.key&quot;</span>
<span class="line"></span>
<span class="line">            }</span>
<span class="line">            retry_join {</span>
<span class="line"></span>
<span class="line">              leader_api_addr = &quot;https://vault-1.vault-internal:8200&quot;</span>
<span class="line"></span>
<span class="line">              leader_ca_cert_file = &quot;/vault/userconfig/vault-tls/vault.ca&quot;</span>
<span class="line"></span>
<span class="line">              leader_client_cert_file = &quot;/vault/userconfig/vault-tls/vault.crt&quot;</span>
<span class="line">              leader_client_key_file = &quot;/vault/userconfig/vault-tls/vault.key&quot;</span>
<span class="line">            }</span>
<span class="line">            retry_join {</span>
<span class="line">              leader_api_addr = &quot;https://vault-2.vault-internal:8200&quot;</span>
<span class="line">              leader_ca_cert_file = &quot;/vault/userconfig/vault-tls/vault.ca&quot;</span>
<span class="line"></span>
<span class="line">              leader_client_cert_file = &quot;/vault/userconfig/vault-tls/vault.crt&quot;</span>
<span class="line"></span>
<span class="line">              leader_client_key_file = &quot;/vault/userconfig/vault-tls/vault.key&quot;</span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">            autopilot {</span>
<span class="line"></span>
<span class="line">              last_contact_threshold = &quot;200ms&quot;</span>
<span class="line"></span>
<span class="line">              last_contact_failure_threshold = &quot;10m&quot;</span>
<span class="line"></span>
<span class="line">              max_trailing_logs = 250000</span>
<span class="line"></span>
<span class="line">              min_quorum = 5</span>
<span class="line"></span>
<span class="line">              server_stabilization_time = &quot;10s&quot;</span>
<span class="line"></span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">           }</span>
<span class="line"></span>
<span class="line">          seal &quot;awskms&quot; {</span>
<span class="line">             region     = &quot;ap-northeast-2&quot;</span>
<span class="line"></span>
<span class="line">             kms_key_id = &quot;{ kms_key_id }&quot;</span>
<span class="line"></span>
<span class="line">           }</span>
<span class="line"></span>
<span class="line">          service_registration &quot;kubernetes&quot; {}</span>
<span class="line"></span>
<span class="line">    image:</span>
<span class="line"></span>
<span class="line">      repository: hashicorp/vault-enterprise</span>
<span class="line"></span>
<span class="line">      tag: 1.12.1-ent</span>
<span class="line"></span>
<span class="line">    env:</span>
<span class="line"></span>
<span class="line">    - name: VAULT_CACERT</span>
<span class="line"></span>
<span class="line">      value: &quot;/vault/userconfig/vault-tls/vault.ca&quot;</span>
<span class="line"></span>
<span class="line">    extraSecretEnvironmentVars:</span>
<span class="line"></span>
<span class="line">      - envName: AWS_ACCESS_KEY_ID</span>
<span class="line"></span>
<span class="line">        secretName: eks-creds</span>
<span class="line"></span>
<span class="line">        secretKey: AWS_ACCESS_KEY_ID</span>
<span class="line"></span>
<span class="line">      - envName: AWS_SECRET_ACCESS_KEY</span>
<span class="line"></span>
<span class="line">        secretName: eks-creds</span>
<span class="line"></span>
<span class="line">        secretKey: AWS_SECRET_ACCESS_KEY</span>
<span class="line"></span>
<span class="line">    service:</span>
<span class="line"></span>
<span class="line">      enabled: true</span>
<span class="line"></span>
<span class="line">      active:</span>
<span class="line"></span>
<span class="line">        enabled: false</span>
<span class="line"></span>
<span class="line">      standby:</span>
<span class="line"></span>
<span class="line">        enabled: false</span>
<span class="line"></span>
<span class="line">      type: ClusterIP</span>
<span class="line">      loadBalancerClass: service.k8s.aws/nlb</span>
<span class="line"></span>
<span class="line">      annotations:</span>
<span class="line">    dataStorage:</span>
<span class="line">      enabled: true</span>
<span class="line"></span>
<span class="line">      storageClass: gp3</span>
<span class="line"></span>
<span class="line">      size: 100Gi</span>
<span class="line"></span>
<span class="line">    auditStorage:</span>
<span class="line"></span>
<span class="line">      enabled: true</span>
<span class="line"></span>
<span class="line">      # Size of the PVC created</span>
<span class="line"></span>
<span class="line">      size: 100Gi</span>
<span class="line"></span>
<span class="line">      # Location where the PVC will be mounted.</span>
<span class="line"></span>
<span class="line">      mountPath: &quot;/vault/audit&quot;</span>
<span class="line"></span>
<span class="line">      # Name of the storage class to use.  If null it will use the</span>
<span class="line"></span>
<span class="line">      # configured default Storage Class.</span>
<span class="line"></span>
<span class="line">      storageClass: gp3</span>
<span class="line"></span>
<span class="line">      # Access Mode of the storage device being used for the PVC</span>
<span class="line"></span>
<span class="line">      accessMode: ReadWriteOnce</span>
<span class="line"></span>
<span class="line">      # Annotations to apply to the PVC</span>
<span class="line"></span>
<span class="line">      annotations: {}</span>
<span class="line"></span>
<span class="line">ui:</span>
<span class="line"></span>
<span class="line">    enabled: true</span>
<span class="line"></span>
<span class="line">    publishNotReadyAddresses: true</span>
<span class="line"></span>
<span class="line">    activeVaultPodOnly: false</span>
<span class="line"></span>
<span class="line">    serviceType: &quot;LoadBalancer&quot;</span>
<span class="line"></span>
<span class="line">    serviceNodePort: null</span>
<span class="line"></span>
<span class="line">    externalPort: 443</span>
<span class="line"></span>
<span class="line">    targetPort: 8200</span>
<span class="line"></span>
<span class="line">    annotations:</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-ip-address-type: ipv4</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-name: gbkim-vault-test-lb</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-subnets: { 서브넷 id }</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-type: external</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-ssl-cert: { 인증서 arn }</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-ssl-ports: &quot;443&quot;</span>
<span class="line"></span>
<span class="line">       service.beta.kubernetes.io/aws-load-balancer-backend-protocol: ssl</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-aws-nlb를-통해-접근-인증서-확인" tabindex="-1"><a class="header-anchor" href="#_3-2-aws-nlb를-통해-접근-인증서-확인"><span><a name="vault인증서-3.2awsnlb를통해접근인증서확인"></a><strong>3.2 AWS NLB를 통해 접근 인증서 확인</strong></span></a></h2><figure><img src="`+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-3-acm-인증서를-통해-접근" tabindex="-1"><a class="header-anchor" href="#_3-3-acm-인증서를-통해-접근"><span><a name="vault인증서-3.3acm인증서를통해접근"></a><strong>3.3 ACM 인증서를 통해 접근</strong></span></a></h2><h3 id="_3-3-1-route53-설정" tabindex="-1"><a class="header-anchor" href="#_3-3-1-route53-설정"><span><a name="vault인증서-3.3.1route53설정"></a><strong>3.3.1 Route53 설정</strong></span></a></h3><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-3-2-레코드-생성" tabindex="-1"><a class="header-anchor" href="#_3-3-2-레코드-생성"><span><a name="vault인증서-3.3.2레코드생성"></a><strong>3.3.2 레코드 생성</strong></span></a></h3><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-3-3-레코드-설정" tabindex="-1"><a class="header-anchor" href="#_3-3-3-레코드-설정"><span><a name="vault인증서-3.3.3레코드설정"></a><strong>3.3.3 레코드 설정</strong></span></a></h3><ul><li>레코드 이름 <ul><li>대상 도메인 이름 설정</li></ul></li><li>레코드 유형 <ul><li>A</li></ul></li><li>별칭 <ul><li>On</li></ul></li><li>트래픽 라우팅 대상 <ul><li>NLB</li><li>ap-northeast-2(서울)</li><li>사용하고자 하는 AWS 로드 밸런서 지정</li></ul></li><li>라우팅 정책 <ul><li>단순 라우팅</li></ul></li></ul><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-3-4-aws-인증서를-통해-vault-ui-접근" tabindex="-1"><a class="header-anchor" href="#_3-3-4-aws-인증서를-통해-vault-ui-접근"><span><a name="vault인증서-3.3.4aws인증서를통해vaultui접근"></a><strong>3.3.4 AWS 인증서를 통해 Vault UI 접근</strong></span></a></h3><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_4-aws-private-ca를-사용-하는-인증서-생성" tabindex="-1"><a class="header-anchor" href="#_4-aws-private-ca를-사용-하는-인증서-생성"><span><a name="vault인증서-4.awsprivateca를사용하는인증서생성"></a><strong>4. AWS Private Ca를 사용 하는 인증서 생성</strong></span></a></h1><h2 id="_4-1-사전-준비-요건" tabindex="-1"><a class="header-anchor" href="#_4-1-사전-준비-요건"><span><a name="vault인증서-4.1사전준비요건"></a><strong>4.1 사전 준비 요건</strong></span></a></h2><ul><li>Private Ca 생성<br><img src="'+v+'" alt="" loading="lazy"></li></ul><h2 id="_4-2-acm-인증서-생성" tabindex="-1"><a class="header-anchor" href="#_4-2-acm-인증서-생성"><span><a name="vault인증서-4.2acm인증서생성"></a><strong>4.2 ACM 인증서 생성</strong></span></a></h2><ul><li><p>요청<br><img src="'+a+'" alt="" loading="lazy"></p></li><li><p>인증서 요청</p><ul><li>프라이빗 인증서 요청(인증서 기관이 aws가 아닌 PrivateCA로 만든 주체로 함)</li><li>다음<br><img src="'+C+'" alt="" loading="lazy"></li></ul></li><li><p>인증 기관 세부 정보</p></li></ul><p><img src="'+o+'" alt="" loading="lazy"><br><img src="'+E+'" alt="" loading="lazy"></p><ul><li><p>도메인 이름<br><img src="'+m+'" alt="" loading="lazy"></p></li><li><p>키 알고리즘<br><img src="'+b+'" alt="" loading="lazy"></p></li><li><p>태그</p></li><li><p>인증서 갱신 권한</p></li><li><p>요청</p></li></ul><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>Private Ca에 대한 인증 기관 기반으로 인증서 생성<br><img src="'+a+'" alt="" loading="lazy"></li></ul><h1 id="_5-aws-private-ca-기반으로-생성-된-인증서를-vault에-적용" tabindex="-1"><a class="header-anchor" href="#_5-aws-private-ca-기반으로-생성-된-인증서를-vault에-적용"><span><a name="vault인증서-5.awsprivateca기반으로생성된인증서를vault에적용"></a><strong>5. AWS Private Ca 기반으로 생성 된 인증서를 Vault에 적용</strong></span></a></h1><ul><li><p>내보내기<br><img src="'+g+'" alt="" loading="lazy"></p></li><li><p>인증서 내보내기</p><ul><li>AWS 상에서 내보기를 사용하려면 비밀번호를 생성 후 내보기가 가능<br><img src="'+A+'" alt="" loading="lazy"></li></ul></li><li><p>내보낸 인증서</p></li><li><p>다운로드<br><img src="'+D+'" alt="" loading="lazy"></p></li><li><p>사설 인증서 가져오기<br><img src="'+B+'" alt="" loading="lazy"></p></li></ul><h1 id="결론" tabindex="-1"><a class="header-anchor" href="#결론"><span><a name="vault인증서-결론"></a><strong>결론</strong></span></a></h1><p>테스트 한 결과로는 Private Ca로 EKS 환경에서 Vault에 사설 인증서를 적용은 불가능</p><p>안되는 이유</p><hr><h1 id="진행-방식" tabindex="-1"><a class="header-anchor" href="#진행-방식"><span><a name="vault인증서-진행방식"></a><strong>진행 방식</strong></span></a></h1><ol><li>AWS Private Ca 생성</li><li>Private Ca를 통해 AWS Certificate Manager 등록 시 private 인증서 요청(csr 부분)</li></ol><ul><li>AWS Private Ca을 생성 하지 않으면 private 인증서 요청이 불가 합니다.</li></ul><ol start="3"><li>1번, 2번으로 AWS Certificate Manager에 등록이 가능합니다.</li><li>k8s에 인증서를 적용 하기 위해서는 k8s 자체적으로 csr이 필요한데 aws에서는 인증 주체가 Private Ca로 되어 있기 때문에 따로 csr파일을 제공하지 않아 k8s에 적용 할 수 없습니다.</li></ol><p>아래 참고 링크에 csr에 대한 부분에 대한 가이드 제공</p><p>참고: vault k8s 인증서 적용 공식 문서</p><ul><li><a href="https://developer.hashicorp.com/vault/docs/platform/k8s/helm/examples/standalone-tls" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/vault/docs/platform/k8s/helm/examples/standalone-tls</a></li></ul><h2 id="대안" tabindex="-1"><a class="header-anchor" href="#대안"><span><a name="vault인증서-대안"></a><strong>대안</strong></span></a></h2><ul><li>위 테스트 통한 방법으로 하게 되면 aws 인증서(ACM)를 관리 하지 않기 때문에 인증서 갱신 시 수동으로 갱신을 해야 하는 번거로움이 있습니다.</li></ul><p>⇒ 대안으로 eks 환경에서는 container로 사설 인증서를 관리 해주는 container(cert-manager)를 제공 할 수 있는데 이 container로 인증서를 자동으로 갱신 할 수 있습니다.</p><p>참고</p><ol><li><a href="https://aws.amazon.com/ko/blogs/containers/setting-up-end-to-end-tls-encryption-on-amazon-eks-with-the-new-aws-load-balancer-controller/" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/ko/blogs/containers/setting-up-end-to-end-tls-encryption-on-amazon-eks-with-the-new-aws-load-balancer-controller/</a></li><li><a href="https://cleanupthedesk.tistory.com/43" target="_blank" rel="noopener noreferrer">https://cleanupthedesk.tistory.com/43</a></li></ol><p>Created by 김기범(<a href="mailto:rlarlqja1001@gmail.com" target="_blank" rel="noopener noreferrer">rlarlqja1001@gmail.com</a>)</p>',78),y=[f];function k(x,S){return n(),e("div",null,y)}const R=s(_,[["render",k],["__file","vault-cert-test.html.vue"]]),P=JSON.parse('{"path":"/04-HashiCorp/06-Vault/06-Config/vault-cert-test.html","title":"Vault 사설 인증서 관리 테스트","lang":"ko-KR","frontmatter":{"description":"Vault 사설 인증서 관리 테스트","tag":["vault","AWS","k8s","helm"],"author":"gbkim","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/06-Vault/06-Config/vault-cert-test.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Vault 사설 인증서 관리 테스트"}],["meta",{"property":"og:description","content":"Vault 사설 인증서 관리 테스트"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-08-31T05:01:41.000Z"}],["meta",{"property":"article:author","content":"gbkim"}],["meta",{"property":"article:tag","content":"vault"}],["meta",{"property":"article:tag","content":"AWS"}],["meta",{"property":"article:tag","content":"k8s"}],["meta",{"property":"article:tag","content":"helm"}],["meta",{"property":"article:modified_time","content":"2024-08-31T05:01:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vault 사설 인증서 관리 테스트\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-31T05:01:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gbkim\\"}]}"]]},"headers":[{"level":2,"title":"1.1 환경 변수 설정","slug":"_1-1-환경-변수-설정","link":"#_1-1-환경-변수-설정","children":[{"level":3,"title":"1.1.1 Kubernetes에서 서명할 키 생성","slug":"_1-1-1-kubernetes에서-서명할-키-생성","link":"#_1-1-1-kubernetes에서-서명할-키-생성","children":[]},{"level":3,"title":"1.1.2 인증서 서명 요청(CSR)을 생성","slug":"_1-1-2-인증서-서명-요청-csr-을-생성","link":"#_1-1-2-인증서-서명-요청-csr-을-생성","children":[]},{"level":3,"title":"1.1.3 CSR을 생성","slug":"_1-1-3-csr을-생성","link":"#_1-1-3-csr을-생성","children":[]},{"level":3,"title":"1.1.4 csr.yaml 생성","slug":"_1-1-4-csr-yaml-생성","link":"#_1-1-4-csr-yaml-생성","children":[]},{"level":3,"title":"1.1.5 csr.yaml 배포","slug":"_1-1-5-csr-yaml-배포","link":"#_1-1-5-csr-yaml-배포","children":[]},{"level":3,"title":"1.1.6 CSR을 승인 요청","slug":"_1-1-6-csr을-승인-요청","link":"#_1-1-6-csr을-승인-요청","children":[]},{"level":3,"title":"1.1.7 승인 상태 확인","slug":"_1-1-7-승인-상태-확인","link":"#_1-1-7-승인-상태-확인","children":[]}]},{"level":2,"title":"2.1 crt 파일 생성","slug":"_2-1-crt-파일-생성","link":"#_2-1-crt-파일-생성","children":[]},{"level":2,"title":"2.2 쿠버네티스 ca 설정 파일","slug":"_2-2-쿠버네티스-ca-설정-파일","link":"#_2-2-쿠버네티스-ca-설정-파일","children":[]},{"level":2,"title":"2.3 key, crt, ca 인증서 시크릿 생성","slug":"_2-3-key-crt-ca-인증서-시크릿-생성","link":"#_2-3-key-crt-ca-인증서-시크릿-생성","children":[]},{"level":2,"title":"3.1 helm values.yaml 파일","slug":"_3-1-helm-values-yaml-파일","link":"#_3-1-helm-values-yaml-파일","children":[]},{"level":2,"title":"3.2 AWS NLB를 통해 접근 인증서 확인","slug":"_3-2-aws-nlb를-통해-접근-인증서-확인","link":"#_3-2-aws-nlb를-통해-접근-인증서-확인","children":[]},{"level":2,"title":"3.3 ACM 인증서를 통해 접근","slug":"_3-3-acm-인증서를-통해-접근","link":"#_3-3-acm-인증서를-통해-접근","children":[{"level":3,"title":"3.3.1 Route53 설정","slug":"_3-3-1-route53-설정","link":"#_3-3-1-route53-설정","children":[]},{"level":3,"title":"3.3.2 레코드 생성","slug":"_3-3-2-레코드-생성","link":"#_3-3-2-레코드-생성","children":[]},{"level":3,"title":"3.3.3 레코드 설정","slug":"_3-3-3-레코드-설정","link":"#_3-3-3-레코드-설정","children":[]},{"level":3,"title":"3.3.4 AWS 인증서를 통해 Vault UI 접근","slug":"_3-3-4-aws-인증서를-통해-vault-ui-접근","link":"#_3-3-4-aws-인증서를-통해-vault-ui-접근","children":[]}]},{"level":2,"title":"4.1 사전 준비 요건","slug":"_4-1-사전-준비-요건","link":"#_4-1-사전-준비-요건","children":[]},{"level":2,"title":"4.2 ACM 인증서 생성","slug":"_4-2-acm-인증서-생성","link":"#_4-2-acm-인증서-생성","children":[]},{"level":2,"title":"대안","slug":"대안","link":"#대안","children":[]}],"git":{"createdTime":1725080501000,"updatedTime":1725080501000,"contributors":[{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":18.6,"words":1116},"filePathRelative":"04-HashiCorp/06-Vault/06-Config/vault-cert-test.md","localizedDate":"2024년 8월 31일","excerpt":"\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%82%AC%EC%A0%84%EC%A4%80%EB%B9%84%EC%82%AC%ED%95%AD\\">사전 준비 사항</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.vault%EC%82%AC%EC%84%A4%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A7%8C%EB%93%A4%EA%B8%B0\\">1. Vault 사설 인증서 만들기</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98%EC%84%A4%EC%A0%95\\">1.1 환경 변수 설정</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.1kubernetes%EC%97%90%EC%84%9C%EC%84%9C%EB%AA%85%ED%95%A0%ED%82%A4%EC%83%9D%EC%84%B1\\">1.1.1 Kubernetes에서 서명할 키 생성</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.2%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%84%9C%EB%AA%85%EC%9A%94%EC%B2%AD(csr)%EC%9D%84%EC%83%9D%EC%84%B1\\">1.1.2 인증서 서명 요청(CSR)을 생성</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.3csr%EC%9D%84%EC%83%9D%EC%84%B1\\">1.1.3 CSR을 생성</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.4csr.yaml%EC%83%9D%EC%84%B1\\">1.1.4 csr.yaml 생성</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.5csr.yaml%EB%B0%B0%ED%8F%AC\\">1.1.5 csr.yaml 배포</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.6csr%EC%9D%84%EC%8A%B9%EC%9D%B8%EC%9A%94%EC%B2%AD\\">1.1.6 CSR을 승인 요청</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-1.1.7%EC%8A%B9%EC%9D%B8%EC%83%81%ED%83%9C%ED%99%95%EC%9D%B8\\">1.1.7 승인 상태 확인</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.%ED%82%A4,%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%B0%8Fkubernetesca%EB%A5%BCkubernetessecret%EC%A0%80%EC%9E%A5\\">2. 키, 인증서 및 Kubernetes CA를 Kubernetes secret 저장</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.1crt%ED%8C%8C%EC%9D%BC%EC%83%9D%EC%84%B1\\">2.1 crt 파일 생성</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.2%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4ca%EC%84%A4%EC%A0%95%ED%8C%8C%EC%9D%BC\\">2.2 쿠버네티스 ca 설정 파일</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-2.3key,crt,ca%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%8B%9C%ED%81%AC%EB%A6%BF%EC%83%9D%EC%84%B1\\">2.3 key, crt, ca 인증서 시크릿 생성</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.vaulttls%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%A0%81%EC%9A%A9\\">3. Vault tls 인증서 적용</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.1helmvalues.yaml%ED%8C%8C%EC%9D%BC\\">3.1 helm values.yaml 파일</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.2awsnlb%EB%A5%BC%ED%86%B5%ED%95%B4%EC%A0%91%EA%B7%BC%EC%9D%B8%EC%A6%9D%EC%84%9C%ED%99%95%EC%9D%B8\\">3.2 AWS NLB를 통해 접근 인증서 확인</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3acm%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A5%BC%ED%86%B5%ED%95%B4%EC%A0%91%EA%B7%BC\\">3.3 ACM 인증서를 통해 접근</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.1route53%EC%84%A4%EC%A0%95\\">3.3.1 Route53 설정</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.2%EB%A0%88%EC%BD%94%EB%93%9C%EC%83%9D%EC%84%B1\\">3.3.2 레코드 생성</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.3%EB%A0%88%EC%BD%94%EB%93%9C%EC%84%A4%EC%A0%95\\">3.3.3 레코드 설정</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-3.3.4aws%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A5%BC%ED%86%B5%ED%95%B4vaultui%EC%A0%91%EA%B7%BC\\">3.3.4 AWS 인증서를 통해 Vault UI 접근</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-4.awsprivateca%EB%A5%BC%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%83%9D%EC%84%B1\\">4. AWS Private Ca를 사용 하는 인증서 생성</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-4.1%EC%82%AC%EC%A0%84%EC%A4%80%EB%B9%84%EC%9A%94%EA%B1%B4\\">4.1 사전 준비 요건</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-4.2acm%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%83%9D%EC%84%B1\\">4.2 ACM 인증서 생성</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-5.awsprivateca%EA%B8%B0%EB%B0%98%EC%9C%BC%EB%A1%9C%EC%83%9D%EC%84%B1%EB%90%9C%EC%9D%B8%EC%A6%9D%EC%84%9C%EB%A5%BCvault%EC%97%90%EC%A0%81%EC%9A%A9\\">5. AWS Private Ca 기반으로 생성 된 인증서를 Vault에 적용</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EA%B2%B0%EB%A1%A0\\">결론</a>\\n<ul>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%A7%84%ED%96%89%EB%B0%A9%EC%8B%9D\\">진행 방식</a></li>\\n<li><a href=\\"#vault%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%8C%80%EC%95%88\\">대안</a></li>\\n</ul>\\n</li>\\n</ul>","copyright":{"author":"gbkim"}}');export{R as comp,P as data};
