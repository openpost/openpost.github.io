import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,h as n}from"./app-DhMJQ1_3.js";const l="/assets/3287187593-B32Hi48W.png?width=760",i="/assets/3287417026-BoLxQtej.png?width=760",t="/assets/3286861543-DP2DiUMW.png?width=712",r="/assets/3286894457-DI1RS78I.png?width=712",c="/assets/3287351709-CCVXlw2l.png?width=760",p="/assets/3287417063-9ajkFWzh.png?width=712",d="/assets/3286764119-DZu8qECO.png?width=712",o="/assets/3287286346-IfoEvvWr.png?width=712",m="/assets/3286894515-BkIaIFEr.png?width=712",u="/assets/3287417093-k9tepcrx.png?width=688",v="/assets/3286796210-1anIXgQt.png?width=736",h="/assets/3287384334-DvvksWw3.png?width=736",g="/assets/3286796235-kvkn7Roq.png?width=736",b="/assets/3287188089-idCVDxg0.png?width=730",_="/assets/3286796256-DomqsQFk.png?width=730",f={},x=n('<figure><img src="'+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>본 문서는 EKS 환경에 Flexible Deployment Options를 배포 하면서 DB를 aws 서비스를 사용하지 않고 container로 배포하는 테스트 기록을 남긴 문서입니다.</p><h1 id="container-component-deploy" tabindex="-1"><a class="header-anchor" href="#container-component-deploy"><span>Container component deploy</span></a></h1><p>사전 조건</p><ol><li>FDO 사설 인증서(본 테스트는 openssl로 진행) 및 도메인 준비(tfe.crt,tfe.key)</li><li>FDO 용 라이선스</li></ol><p>시나리오</p><ol><li><p>eks 환경에 terraform(FDO), redis, postgresql, minio helm 배포</p></li><li><p>vcs 연동 및 plan, apply</p></li><li><p>FDO api를 사용한 backup &amp; restore</p></li><li><p>eks cluster를 velero로 사용하여 backup &amp; restore</p></li></ol><table><thead><tr><th style="text-align:center;"><strong>Element</strong></th><th style="text-align:center;"><strong>버전(docker image 경우 tag 명)</strong></th></tr></thead><tbody><tr><td style="text-align:center;">EKS</td><td style="text-align:center;">1.26</td></tr><tr><td style="text-align:center;">kubectl</td><td style="text-align:center;">1.23.7</td></tr><tr><td style="text-align:center;">Helm</td><td style="text-align:center;">3.8.2</td></tr><tr><td style="text-align:center;">Flexible Deployment Options</td><td style="text-align:center;">v202311-1</td></tr><tr><td style="text-align:center;">Redis</td><td style="text-align:center;">7.0.11-debian-11-r12</td></tr><tr><td style="text-align:center;">Postgres</td><td style="text-align:center;">14.5.0-debian-11-r35</td></tr><tr><td style="text-align:center;">minio</td><td style="text-align:center;">RELEASE.2023-05-18T00-05-36Z</td></tr><tr><td style="text-align:center;">velero</td><td style="text-align:center;">1.9.2</td></tr></tbody></table><p>[주의]</p><div class="hint-container caution"><p class="hint-container-title">위험</p><p>FDO docker version image(v202311-1) 기준 Postgres 15.x version 사용 시 아래와 같은 에러로 정상적으로 백업이 이루어 지지 않아 14.5 버전을 사용 하였습니다.</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">pg_dump: error: server version: 15.3; pg_dump version: 14.9 (Ubuntu 14.9-1.pgdg22.04+1)</span>
<span class="line">pg_dump: error: aborting because of server version mismatch</span>
<span class="line"></span></code></pre></div></div><h1 id="_1-redis-helm" tabindex="-1"><a class="header-anchor" href="#_1-redis-helm"><span>1. Redis Helm</span></a></h1><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis"><span>Redis</span></a></h2><h3 id="_1-1-helm-values-yaml" tabindex="-1"><a class="header-anchor" href="#_1-1-helm-values-yaml"><span>1.1 helm values.yaml</span></a></h3><p>참고: 아래 yaml 내용은 첨부 된 redis yaml 파일에서 설정 한 부분만 기입</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[중략]</span>
<span class="line"></span>
<span class="line">image:</span>
<span class="line">  registry: docker.io</span>
<span class="line">  repository: bitnami/redis</span>
<span class="line">  tag: 7.0.11-debian-11-r12</span>
<span class="line"></span>
<span class="line">[중략]</span>
<span class="line"></span>
<span class="line">tls:</span>
<span class="line">  enabled: false</span>
<span class="line"></span>
<span class="line">[중략]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-command" tabindex="-1"><a class="header-anchor" href="#_1-2-command"><span>1.2 Command</span></a></h3><h4 id="_1-2-1-helm-배포" tabindex="-1"><a class="header-anchor" href="#_1-2-1-helm-배포"><span>1.2.1 helm 배포</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">helm repo add bitnami https://charts.bitnami.com/bitnami</span>
<span class="line"></span>
<span class="line">kubectl create ns redis</span>
<span class="line"></span>
<span class="line">helm install redis-dev  -n redis --version 17.11.3 . --values values.yaml --debug</span>
<span class="line"></span></code></pre></div><h1 id="_2-postgresql-helm-배포" tabindex="-1"><a class="header-anchor" href="#_2-postgresql-helm-배포"><span>2. Postgresql Helm 배포</span></a></h1><h2 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql"><span>Postgresql</span></a></h2><h3 id="_2-1-helm-values-yaml" tabindex="-1"><a class="header-anchor" href="#_2-1-helm-values-yaml"><span>2.1 helm values.yaml</span></a></h3><p>참고: 아래 yaml 내용은 첨부 된 Postgresql yaml 파일에서 설정 한 부분만<br> 기입</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[중략]</span>
<span class="line"></span>
<span class="line">image:</span>
<span class="line">  registry: docker.io</span>
<span class="line">  repository: bitnami/postgresql</span>
<span class="line">  tag: 14.5.0-debian-11-r35</span>
<span class="line">  </span>
<span class="line">[중략]</span>
<span class="line"></span>
<span class="line">auth:</span>
<span class="line">  enablePostgresUser: true</span>
<span class="line">  postgresPassword: &quot;[postgresPassword]&quot;</span>
<span class="line">  username: &quot;[postgre username]&quot;</span>
<span class="line">  password: &quot;[password]&quot;</span>
<span class="line">  database: &quot;[database name]&quot;</span>
<span class="line">  </span>
<span class="line">[중략]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-command" tabindex="-1"><a class="header-anchor" href="#_2-2-command"><span>2.2 Command</span></a></h3><h4 id="_2-2-1-helm-배포" tabindex="-1"><a class="header-anchor" href="#_2-2-1-helm-배포"><span>2.2.1 helm 배포</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">helm repo add bitnami https://charts.bitnami.com/bitnami</span>
<span class="line">helm install postgresql-dev  -n default --version 11.9.13 . --values values.yaml --debug</span>
<span class="line"></span></code></pre></div><h4 id="_2-2-2-posgresql-db-확인" tabindex="-1"><a class="header-anchor" href="#_2-2-2-posgresql-db-확인"><span>2.2.2 posgresql DB 확인</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"># container 내부 Command</span>
<span class="line">psql --host 127.0.0.1 -U [database 계정] -d tfe -p 5432</span>
<span class="line">select * from pg_tables;</span>
<span class="line"></span></code></pre></div><h1 id="_3-minio-helm-배포" tabindex="-1"><a class="header-anchor" href="#_3-minio-helm-배포"><span>3. Minio Helm 배포</span></a></h1><h2 id="minio" tabindex="-1"><a class="header-anchor" href="#minio"><span>Minio</span></a></h2><h3 id="_3-1-helm-values-yaml" tabindex="-1"><a class="header-anchor" href="#_3-1-helm-values-yaml"><span>3.1 helm values.yaml</span></a></h3><p>참고: 아래 yaml 내용은 첨부 된 Minio yaml 파일에서 설정 한 부분만 기입</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[중략]</span>
<span class="line"></span>
<span class="line">image:</span>
<span class="line">  repository: quay.io/minio/minio</span>
<span class="line">  tag: RELEASE.2023-05-18T00-05-36Z</span>
<span class="line">  pullPolicy: IfNotPresent</span>
<span class="line">[중략]</span>
<span class="line"></span>
<span class="line">rootUser: &quot;[rootUser]&quot;</span>
<span class="line">rootPassword: &quot;[rootPassword]&quot;</span>
<span class="line"></span>
<span class="line">[중략]</span>
<span class="line"></span>
<span class="line">## FDO terraform plan, apply를 파일 적재되는 지 확인 용</span>
<span class="line">consoleService:</span>
<span class="line">  annotations:</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-subnets&#39;: &quot;subnet-03b41598fbe094c5e, subnet-0ec501ba454a8c95e, subnet-0aacc8ce08d63e061&quot;</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-scheme&#39;: &quot;internet-facing&quot;</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-nlb-target-type&#39;: &quot;instance&quot;</span>
<span class="line">  type: LoadBalancer # ClusterIP</span>
<span class="line">  port: 9001</span>
<span class="line">  loadBalancerClass: service.k8s.aws/nlb</span>
<span class="line">  nodePort: 32001</span>
<span class="line">  </span>
<span class="line">[중략]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-command" tabindex="-1"><a class="header-anchor" href="#_3-2-command"><span>3.2 Command</span></a></h3><h4 id="_3-2-1-helm-배포" tabindex="-1"><a class="header-anchor" href="#_3-2-1-helm-배포"><span>3.2.1 helm 배포</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">helm repo add bitnami https://charts.bitnami.com/bitnami</span>
<span class="line">kubectl create ns minio</span>
<span class="line">helm install minio-dev  -n minio --version 5.0.10 . --values values.yaml --debug</span>
<span class="line"></span></code></pre></div><h4 id="_3-2-2-minio-ui-접근-시-id-password-확인" tabindex="-1"><a class="header-anchor" href="#_3-2-2-minio-ui-접근-시-id-password-확인"><span>3.2.2 minio UI 접근 시 ID, Password 확인</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">kubectl get secret --namespace minio minio-dev -o jsonpath=&quot;{.data.root-user}&quot; | base64 -d</span>
<span class="line"></span>
<span class="line">kubectl get secret --namespace minio minio-dev -o jsonpath=&quot;{.data.root-password}&quot; | base64 -d</span>
<span class="line"></span></code></pre></div><h4 id="_3-2-2-fdo-연동-후-plan-apply-minio-bucket-data-확인" tabindex="-1"><a class="header-anchor" href="#_3-2-2-fdo-연동-후-plan-apply-minio-bucket-data-확인"><span>3.2.2 FDO 연동 후 plan,apply Minio bucket data 확인</span></a></h4><figure><img src="`+i+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_4-fdo-flexible-deployment-options-helm-배포" tabindex="-1"><a class="header-anchor" href="#_4-fdo-flexible-deployment-options-helm-배포"><span>4. FDO(Flexible Deployment Options) Helm 배포</span></a></h1><h2 id="fdo-flexible-deployment-options" tabindex="-1"><a class="header-anchor" href="#fdo-flexible-deployment-options"><span>FDO(Flexible Deployment Options)</span></a></h2><h3 id="_4-1-helm-values-yaml" tabindex="-1"><a class="header-anchor" href="#_4-1-helm-values-yaml"><span>4.1 helm values.yaml</span></a></h3><p>참고: 아래 yaml 내용은 첨부 된 FDO yaml 파일에서 설정 한 부분만 기입</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">[중략]</span>
<span class="line"></span>
<span class="line">image:</span>
<span class="line">  repository: images.releases.hashicorp.com</span>
<span class="line">  name: hashicorp/terraform-enterprise</span>
<span class="line">  tag: v202311-1</span>
<span class="line">  </span>
<span class="line">[중략]</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">service:</span>
<span class="line">  annotations:</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-subnets&#39;: &quot;[외부 통신 서브넷]&quot;</span>
<span class="line">    ## nlb 외부 통신</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-scheme&#39;: &quot;internet-facing&quot;</span>
<span class="line">    ## target group 지정 type</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-nlb-target-type&#39;: &quot;instance&quot;</span>
<span class="line">    ## 인증서 arn</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-ssl-cert&#39;: &quot;[인증서 arn]&quot;</span>
<span class="line">    ## nlb 프로토콜 annotation</span>
<span class="line">    &#39;service.beta.kubernetes.io/aws-load-balancer-backend-protocol&#39;: &#39;ssl&#39;</span>
<span class="line">  type: LoadBalancer # ClusterIP</span>
<span class="line">  port: 443</span>
<span class="line">  nodePort: 32443</span>
<span class="line">  loadBalancerClass: service.k8s.aws/nlb</span>
<span class="line"></span>
<span class="line">[중략]</span>
<span class="line"></span>
<span class="line">env:</span>
<span class="line">  variables:</span>
<span class="line">    ## terraform 접근 URL </span>
<span class="line">    TFE_HOSTNAME: [terraform 접근 URL] ## ex) xxx.xxx.xyz Protocol 없이 설정</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 postgresql svc dns, headless로 설정 시 접근이 안되는 문제로 postgres 기본 svc로 설정</span>
<span class="line">    ## [helm 배포 시 설정 된 이름].[namespace].svc.cluster.local ==&gt; 포트 지정 없이 설정</span>
<span class="line">    TFE_DATABASE_HOST: &quot;postgresql-dev.default.svc.cluster.local&quot;</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 postgresql database 이름</span>
<span class="line">    ## postgre value.yaml 135 번째 줄 설정</span>
<span class="line">    TFE_DATABASE_NAME: &quot;[TFE_DATABASE_NAME]&quot;</span>
<span class="line">    ## ssl mode</span>
<span class="line">    TFE_DATABASE_PARAMETERS: &quot;sslmode=disable&quot;</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 postgresql 유저 계정</span>
<span class="line">    ## postgre value.yaml 129 번째 줄 설정</span>
<span class="line">    TFE_DATABASE_USER: &quot;[TFE_DATABASE_USER]&quot;</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 redis dns, headless로 설정하면 접근이 안되는 문제로 master로 설정</span>
<span class="line">    ## [helm 배포 시 설정 된 이름].[namespace].svc.cluster.local:6379</span>
<span class="line">    TFE_REDIS_HOST: &quot;redis-dev-master.redis.svc.cluster.local:6379&quot;</span>
<span class="line"></span>
<span class="line">    ## redis AUTH 사용할 경우 에러 발생으로 임시 false</span>
<span class="line">    ## auth 기능 비활성 시 redis value.yaml 123 번째 줄 기능 false 설정</span>
<span class="line">    TFE_REDIS_USE_AUTH: &quot;false&quot;</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 minio type은 s3로 해야함</span>
<span class="line">    TFE_OBJECT_STORAGE_TYPE: s3</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 minio bucket 이름</span>
<span class="line">    TFE_OBJECT_STORAGE_S3_BUCKET: &quot;[minio bucket name]&quot;</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 minio svc dns</span>
<span class="line">    ## [helm 배포 시 설정 된 이름].[namespace].svc.cluster.local:9000</span>
<span class="line">    TFE_OBJECT_STORAGE_S3_ENDPOINT: &quot;http://minio-dev.minio.svc.cluster.local:9000&quot;</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 minio가 올라가는 aws 지역</span>
<span class="line">    TFE_OBJECT_STORAGE_S3_REGION: &quot;ap-northeast-2&quot;</span>
<span class="line"></span>
<span class="line">    TFE_IACT_SUBNETS: &quot;0.0.0.0/0&quot;</span>
<span class="line">    TFE_CAPACITY_CONCURRENCY: 10</span>
<span class="line"></span>
<span class="line">    ## container로 올리는 minio 접근 시 admin 계정 ID,Password</span>
<span class="line">    ## minio vaule.yaml 90 번째 줄 설정</span>
<span class="line">    TFE_OBJECT_STORAGE_S3_ACCESS_KEY_ID: &quot;[admin 계정 ID]&quot;</span>
<span class="line">    TFE_OBJECT_STORAGE_S3_SECRET_ACCESS_KEY: &quot;[admin 계정 Password]&quot;</span>
<span class="line">  secrets:</span>
<span class="line">    ## postgre value.yaml 파일 132 번째 줄 설정</span>
<span class="line">    ## container로 올리는 postgresql 접근 비밀번호</span>
<span class="line">    TFE_DATABASE_PASSWORD: &quot;[postgresql 접근 비밀번호]&quot;</span>
<span class="line"></span>
<span class="line">    ## Terraform FDO Licence</span>
<span class="line">    TFE_LICENSE: &quot;[Terraform FDO Licence]&quot;</span>
<span class="line"></span>
<span class="line">    ## terraform FDO vault 암호, backup &amp; restore 시 필요함</span>
<span class="line">    ## https://developer.hashicorp.com/terraform/enterprise/flexible-deployments/admin/admin-cli/backup-restore</span>
<span class="line">    TFE_ENCRYPTION_PASSWORD: &quot;[TFE_ENCRYPTION_PASSWORD]&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-1-1-command" tabindex="-1"><a class="header-anchor" href="#_4-1-1-command"><span>4.1.1 Command</span></a></h4><h4 id="_4-1-2-fdo-배포-전-image-registry-정책-설정" tabindex="-1"><a class="header-anchor" href="#_4-1-2-fdo-배포-전-image-registry-정책-설정"><span>4.1.2 FDO 배포 전 image registry 정책 설정</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">$ kubectl create secret docker-registry terraform-enterprise --docker-server=images.releases.hashicorp.com --docker-username=terraform --docker-password=$(cat { 라이선스 파일 }) -n tfe</span>
<span class="line"></span>
<span class="line">## 도메인 인증서 설정 한 파일 시크릿으로 배포</span>
<span class="line">$ kubectl create secret tls terraform-enterprise-certificates --cert=tfe.crt --key=tfe.key -n tfe</span>
<span class="line"></span></code></pre></div><h4 id="_4-1-3-helm-배포" tabindex="-1"><a class="header-anchor" href="#_4-1-3-helm-배포"><span>4.1.3 helm 배포</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">helm repo add bitnami https://charts.bitnami.com/bitnami</span>
<span class="line"></span>
<span class="line">kubectl create ns tfe</span>
<span class="line"></span>
<span class="line">helm install terraform -n tfe --version 1.1.0 . --values values.yaml --debug</span>
<span class="line"></span></code></pre></div><h4 id="_4-1-4-supervisorctl-명령어로-하여-fdo-내부-연동-된-부분을-확인-redis-postgresql-같은-경우-외부-연동" tabindex="-1"><a class="header-anchor" href="#_4-1-4-supervisorctl-명령어로-하여-fdo-내부-연동-된-부분을-확인-redis-postgresql-같은-경우-외부-연동"><span>4.1.4 supervisorctl 명령어로 하여 FDO 내부 연동 된 부분을 확인(redis, postgresql 같은 경우 외부 연동)</span></a></h4><figure><img src="`+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-1-5-정상-helm-배포-이후-fdo-container-내부에서-아래-command로-fdo-admin-계정-생성을-위한-token-발행" tabindex="-1"><a class="header-anchor" href="#_4-1-5-정상-helm-배포-이후-fdo-container-내부에서-아래-command로-fdo-admin-계정-생성을-위한-token-발행"><span>4.1.5 정상 helm 배포 이후 FDO container 내부에서 아래 command로 FDO admin 계정 생성을 위한 Token 발행</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">tfectl admin token </span>
<span class="line"></span></code></pre></div><h4 id="_4-1-6-admin-계정-생성" tabindex="-1"><a class="header-anchor" href="#_4-1-6-admin-계정-생성"><span>4.1.6 admin 계정 생성</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">https://{ 사용하는 도메인 }/admin/account/new?token={ 발급 된 토큰 } </span>
<span class="line"></span></code></pre></div><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_5-fdo-backup-restore" tabindex="-1"><a class="header-anchor" href="#_5-fdo-backup-restore"><span>5. FDO Backup &amp; Restore</span></a></h1><h3 id="_5-1-백업-시-인증-토큰-필요" tabindex="-1"><a class="header-anchor" href="#_5-1-백업-시-인증-토큰-필요"><span>5.1 백업 시 인증 토큰 필요</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">/bin/bash -c &#39;cat /var/run/terraform-enterprise/backup-restore/config.hcl | grep backup_token&#39;</span>
<span class="line"></span></code></pre></div><h3 id="_5-2-fdo-container-내부-토큰-발급-command" tabindex="-1"><a class="header-anchor" href="#_5-2-fdo-container-내부-토큰-발급-command"><span>5.2 FDO container 내부 토큰 발급 command</span></a></h3><h3 id="_5-3-payload-json-파일-생성" tabindex="-1"><a class="header-anchor" href="#_5-3-payload-json-파일-생성"><span>5.3 payload.json 파일 생성</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{</span>
<span class="line">  &quot;password&quot;: &quot;{ FDO helm 배포 시 설정 했던 TFE_ENCRYPTION_PASSWORD 값 }&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_5-4-backup-api" tabindex="-1"><a class="header-anchor" href="#_5-4-backup-api"><span>5.4 Backup api</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">curl \\</span>
<span class="line">  --header &quot;Authorization: Bearer { 인증토큰 }&quot; \\</span>
<span class="line">  --request POST \\</span>
<span class="line">  --data @payload.json \\</span>
<span class="line">  --output backup.blob \\</span>
<span class="line">  https:// { 설정한 도메인 } /_backup/api/v1/backup</span>
<span class="line"></span></code></pre></div><h3 id="_5-5-백업이-정상적으로-되었는지-확인" tabindex="-1"><a class="header-anchor" href="#_5-5-백업이-정상적으로-되었는지-확인"><span>5.5 백업이 정상적으로 되었는지 확인</span></a></h3><ul><li>FDO container 내부 경로: /var/log/terraform-enterprise</li></ul><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-6-백업-된-데이터는-curl-command를-한-경로에-생성" tabindex="-1"><a class="header-anchor" href="#_5-6-백업-된-데이터는-curl-command를-한-경로에-생성"><span>5.6 백업 된 데이터는 curl command를 한 경로에 생성</span></a></h3><h3 id="_5-7-terraform-oranization-plan-apply-정보가-저장된-fdo와-fdo와-연동-된-container를-삭제-하여-정상적으로-백업이-되는-지-확인" tabindex="-1"><a class="header-anchor" href="#_5-7-terraform-oranization-plan-apply-정보가-저장된-fdo와-fdo와-연동-된-container를-삭제-하여-정상적으로-백업이-되는-지-확인"><span>5.7 Terraform oranization, plan, apply 정보가 저장된 FDO와 FDO와 연동 된 container를 삭제 하여 정상적으로 백업이 되는 지 확인</span></a></h3><h3 id="_5-8-삭제-전" tabindex="-1"><a class="header-anchor" href="#_5-8-삭제-전"><span>5.8 삭제 전</span></a></h3><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-9-restore" tabindex="-1"><a class="header-anchor" href="#_5-9-restore"><span>5.9 Restore</span></a></h3><h4 id="_5-9-1-삭제-이후-신규-설치" tabindex="-1"><a class="header-anchor" href="#_5-9-1-삭제-이후-신규-설치"><span>5.9.1 삭제 이후 신규 설치</span></a></h4><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_5-9-2-신규-설치-된-fdo에-초기-설치-생성-했던-계정으로-login" tabindex="-1"><a class="header-anchor" href="#_5-9-2-신규-설치-된-fdo에-초기-설치-생성-했던-계정으로-login"><span>5.9.2 신규 설치 된 FDO에 초기 설치 생성 했던 계정으로 login</span></a></h4><figure><img src="'+o+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_5-9-3-restore-api" tabindex="-1"><a class="header-anchor" href="#_5-9-3-restore-api"><span>5.9.3 Restore api</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">curl \\</span>
<span class="line">  --header &quot;Authorization: Bearer { 인증 토큰 }&quot; \\</span>
<span class="line">  --request POST \\</span>
<span class="line">  --form config=@payload.json \\</span>
<span class="line">  --form snapshot=@backup.blob \\</span>
<span class="line">  https:// { 설정한 도메인 } /_backup/api/v1/restore</span>
<span class="line"></span></code></pre></div><figure><img src="`+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_5-9-4-restore-이후-초기-생성-했던-계정으로-로그인" tabindex="-1"><a class="header-anchor" href="#_5-9-4-restore-이후-초기-생성-했던-계정으로-로그인"><span>5.9.4 Restore 이후 초기 생성 했던 계정으로 로그인</span></a></h4><h4 id="_5-9-5-정상적으로-계정-및-organization-workspace-및-plan-apply-정보-복구" tabindex="-1"><a class="header-anchor" href="#_5-9-5-정상적으로-계정-및-organization-workspace-및-plan-apply-정보-복구"><span>5.9.5 정상적으로 계정 및 organization, workspace 및 plan,apply 정보 복구</span></a></h4><figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_6-velero-cluster-backup-restore" tabindex="-1"><a class="header-anchor" href="#_6-velero-cluster-backup-restore"><span>6. Velero Cluster Backup &amp; Restore</span></a></h1><h2 id="_6-1-백업-할-s3-생성" tabindex="-1"><a class="header-anchor" href="#_6-1-백업-할-s3-생성"><span>6.1 백업 할 S3 생성</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">BUCKET=test-gbkim</span>
<span class="line">REGION=ap-northeast-2</span>
<span class="line"></span>
<span class="line">aws s3api create-bucket \\</span>
<span class="line">    --bucket $BUCKET \\</span>
<span class="line">    --region $REGION \\</span>
<span class="line">    --create-bucket-configuration LocationConstraint=$REGION</span>
<span class="line"></span></code></pre></div><h2 id="_6-2-velero-설치" tabindex="-1"><a class="header-anchor" href="#_6-2-velero-설치"><span>6.2 velero 설치</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">wget https://github.com/vmware-tanzu/velero/releases/download/v1.9.2/velero-v1.9.2-linux-amd64.tar.gz</span>
<span class="line">tar zxvf velero-v1.9.2-linux-amd64.tar.gz</span>
<span class="line">sudo mv velero-v1.9.2-linux-amd64/velero  /usr/local/sbin</span>
<span class="line"></span>
<span class="line">  velero install \\</span>
<span class="line">   --provider aws \\</span>
<span class="line">   --plugins velero/velero-plugin-for-aws:v1.4.1 \\</span>
<span class="line">   --bucket $BUCKET \\</span>
<span class="line">   --backup-location-config region=$REGION \\</span>
<span class="line">   --snapshot-location-config region=$REGION \\</span>
<span class="line">   --secret-file /home/ec2-user/.aws/credentials</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-3-설치-완료-시-velero-container-생성" tabindex="-1"><a class="header-anchor" href="#_6-3-설치-완료-시-velero-container-생성"><span>6.3 설치 완료 시 velero container 생성</span></a></h2><figure><img src="`+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_6-4-velero-backup" tabindex="-1"><a class="header-anchor" href="#_6-4-velero-backup"><span>6.4 velero backup</span></a></h2><ul><li>백업 대상 eks 클러스터</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">velero backup create gbkim</span>
<span class="line"></span></code></pre></div><ul><li>S3 백업 확인</li></ul><figure><img src="`+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_6-5-restore-cluster" tabindex="-1"><a class="header-anchor" href="#_6-5-restore-cluster"><span>6.5 Restore cluster</span></a></h2><figure><img src="'+g+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_6-6-velero-restore" tabindex="-1"><a class="header-anchor" href="#_6-6-velero-restore"><span>6.6 velero restore</span></a></h2><ul><li>restore 대상 eks 클러스터에 velero 설치 된 상태에서 restore 대상<br> 클러스터에서 아래 명령어로 restore</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">velero restore create --from-backup gbkim</span>
<span class="line"></span></code></pre></div><ul><li>restore</li></ul><figure><img src="`+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_6-7-새로운-클러스터에-정상적으로-restore가-되었는지-확인" tabindex="-1"><a class="header-anchor" href="#_6-7-새로운-클러스터에-정상적으로-restore가-되었는지-확인"><span>6.7 새로운 클러스터에 정상적으로 restore가 되었는지 확인</span></a></h2><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',104),y=[x];function k(q,E){return a(),s("div",null,y)}const D=e(f,[["render",k],["__file","FDO-only-container.html.vue"]]),F=JSON.parse('{"path":"/04-HashiCorp/03-Terraform/06-TerraformEnterprise/FDO-only-container.html","title":"Container component deploy","lang":"ko-KR","frontmatter":{"description":"Terraform Enterprise FDO","tag":["Terraform","FDO","TFE"],"author":"gbkim","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/03-Terraform/06-TerraformEnterprise/FDO-only-container.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Container component deploy"}],["meta",{"property":"og:description","content":"Terraform Enterprise FDO"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-07-10T04:16:31.000Z"}],["meta",{"property":"article:author","content":"gbkim"}],["meta",{"property":"article:tag","content":"Terraform"}],["meta",{"property":"article:tag","content":"FDO"}],["meta",{"property":"article:tag","content":"TFE"}],["meta",{"property":"article:modified_time","content":"2024-07-10T04:16:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Container component deploy\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-10T04:16:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gbkim\\"}]}"]]},"headers":[{"level":2,"title":"Redis","slug":"redis","link":"#redis","children":[{"level":3,"title":"1.1 helm values.yaml","slug":"_1-1-helm-values-yaml","link":"#_1-1-helm-values-yaml","children":[]},{"level":3,"title":"1.2 Command","slug":"_1-2-command","link":"#_1-2-command","children":[]}]},{"level":2,"title":"Postgresql","slug":"postgresql","link":"#postgresql","children":[{"level":3,"title":"2.1 helm values.yaml","slug":"_2-1-helm-values-yaml","link":"#_2-1-helm-values-yaml","children":[]},{"level":3,"title":"2.2 Command","slug":"_2-2-command","link":"#_2-2-command","children":[]}]},{"level":2,"title":"Minio","slug":"minio","link":"#minio","children":[{"level":3,"title":"3.1 helm values.yaml","slug":"_3-1-helm-values-yaml","link":"#_3-1-helm-values-yaml","children":[]},{"level":3,"title":"3.2 Command","slug":"_3-2-command","link":"#_3-2-command","children":[]}]},{"level":2,"title":"FDO(Flexible Deployment Options)","slug":"fdo-flexible-deployment-options","link":"#fdo-flexible-deployment-options","children":[{"level":3,"title":"4.1 helm values.yaml","slug":"_4-1-helm-values-yaml","link":"#_4-1-helm-values-yaml","children":[]},{"level":3,"title":"5.1 백업 시 인증 토큰 필요","slug":"_5-1-백업-시-인증-토큰-필요","link":"#_5-1-백업-시-인증-토큰-필요","children":[]},{"level":3,"title":"5.2 FDO container 내부 토큰 발급 command","slug":"_5-2-fdo-container-내부-토큰-발급-command","link":"#_5-2-fdo-container-내부-토큰-발급-command","children":[]},{"level":3,"title":"5.3 payload.json 파일 생성","slug":"_5-3-payload-json-파일-생성","link":"#_5-3-payload-json-파일-생성","children":[]},{"level":3,"title":"5.4 Backup api","slug":"_5-4-backup-api","link":"#_5-4-backup-api","children":[]},{"level":3,"title":"5.5 백업이 정상적으로 되었는지 확인","slug":"_5-5-백업이-정상적으로-되었는지-확인","link":"#_5-5-백업이-정상적으로-되었는지-확인","children":[]},{"level":3,"title":"5.6 백업 된 데이터는 curl command를 한 경로에 생성","slug":"_5-6-백업-된-데이터는-curl-command를-한-경로에-생성","link":"#_5-6-백업-된-데이터는-curl-command를-한-경로에-생성","children":[]},{"level":3,"title":"5.7 Terraform oranization, plan, apply 정보가 저장된 FDO와 FDO와 연동 된 container를 삭제 하여 정상적으로 백업이 되는 지 확인","slug":"_5-7-terraform-oranization-plan-apply-정보가-저장된-fdo와-fdo와-연동-된-container를-삭제-하여-정상적으로-백업이-되는-지-확인","link":"#_5-7-terraform-oranization-plan-apply-정보가-저장된-fdo와-fdo와-연동-된-container를-삭제-하여-정상적으로-백업이-되는-지-확인","children":[]},{"level":3,"title":"5.8 삭제 전","slug":"_5-8-삭제-전","link":"#_5-8-삭제-전","children":[]},{"level":3,"title":"5.9 Restore","slug":"_5-9-restore","link":"#_5-9-restore","children":[]}]},{"level":2,"title":"6.1 백업 할 S3 생성","slug":"_6-1-백업-할-s3-생성","link":"#_6-1-백업-할-s3-생성","children":[]},{"level":2,"title":"6.2 velero 설치","slug":"_6-2-velero-설치","link":"#_6-2-velero-설치","children":[]},{"level":2,"title":"6.3 설치 완료 시 velero container 생성","slug":"_6-3-설치-완료-시-velero-container-생성","link":"#_6-3-설치-완료-시-velero-container-생성","children":[]},{"level":2,"title":"6.4 velero backup","slug":"_6-4-velero-backup","link":"#_6-4-velero-backup","children":[]},{"level":2,"title":"6.5 Restore cluster","slug":"_6-5-restore-cluster","link":"#_6-5-restore-cluster","children":[]},{"level":2,"title":"6.6 velero restore","slug":"_6-6-velero-restore","link":"#_6-6-velero-restore","children":[]},{"level":2,"title":"6.7 새로운 클러스터에 정상적으로 restore가 되었는지 확인","slug":"_6-7-새로운-클러스터에-정상적으로-restore가-되었는지-확인","link":"#_6-7-새로운-클러스터에-정상적으로-restore가-되었는지-확인","children":[]}],"git":{"createdTime":1720584991000,"updatedTime":1720584991000,"contributors":[{"name":"ung","email":"ung@mz.co.kr","commits":1}]},"readingTime":{"minutes":19.58,"words":1175},"filePathRelative":"04-HashiCorp/03-Terraform/06-TerraformEnterprise/FDO-only-container.md","localizedDate":"2024년 7월 10일","excerpt":"<figure><figcaption></figcaption></figure>\\n<p>본 문서는 EKS 환경에 Flexible Deployment Options를 배포 하면서 DB를 aws 서비스를 사용하지 않고 container로 배포하는 테스트 기록을 남긴 문서입니다.</p>\\n<h1>Container component deploy</h1>\\n<p>사전 조건</p>\\n<ol>\\n<li>FDO 사설 인증서(본 테스트는 openssl로 진행) 및 도메인 준비(tfe.crt,tfe.key)</li>\\n<li>FDO 용 라이선스</li>\\n</ol>","copyright":{"author":"gbkim"}}');export{D as comp,F as data};
