import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,h as e}from"./app-DhMJQ1_3.js";const i="/assets/02-sidecar-intention-alldeny-ogH-XLae.png",l="/assets/02-sidecar-services-BZgCIlWq.png",c="/assets/02-sidecar-error-VTAGMmH1.png",p="/assets/02-sidecar-topology-blocked-BzutBfyM.png",t="/assets/02-sidecar-topology-allow-F944RXfc.png",d="/assets/02-sidecar-200-BKyjC3GP.png",r={},o=e('<h1 id="_02-sidecar" tabindex="-1"><a class="header-anchor" href="#_02-sidecar"><span>02. SideCar</span></a></h1><div class="hint-container tip"><p class="hint-container-title">팁</p><p>실습을 위한 조건은 다음과 같습니다.</p><ul><li>Consul 이 구성된 Kubernetes 환경</li><li>설치 구성 시 <code>connectInject</code> 이 활성화 되어있어야 합니다.</li></ul></div><blockquote><p>참고 : <a href="https://learn.hashicorp.com/tutorials/consul/service-mesh-application-secure-networking?in=consul/kubernetes" target="_blank" rel="noopener noreferrer">https://learn.hashicorp.com/tutorials/consul/service-mesh-application-secure-networking?in=consul/kubernetes</a></p></blockquote><p>Consul 서비스 메시를 사용하면 애플리케이션을 제로 트러스트 네트워크에 배포할 수 있습니다. 제로 트러스트 네트워크는 아무 것도 자동으로 신뢰되지 않는 네트워크입니다. 모든 연결은 인증과 승인을 모두 받아야 합니다. 이 패러다임은 동일한 네트워크에서 다수의 서비스가 실행될 수 있는 마이크로서비스 및 멀티 클라우드 환경에서 중요합니다. Consul 서비스 메시를 사용하면 mTLS를 사용하여 서비스 ID를 인증하고 의도를 사용하여 서비스 작업을 승인하거나 차단할 수 있습니다.</p><p>이 튜토리얼에서는 두 개의 서비스 <code>web</code>및 <code>api</code>를 Kubernetes 클러스터에서 실행되는 Consul의 서비스 메시에 배포합니다. 두 서비스는 Consul을 사용하여 서로를 검색하고 사이드카 프록시를 사용하여 mTLS를 통해 통신합니다. 두 서비스는 웹UI와 백엔드 서비스로 구성된 간단한 2-tier 애플리케이션으로 HTTP를 통해 서비스와 통신합니다.</p><figure><img src="https://learn.hashicorp.com/img/consul/web-api-proxy.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="sidecar-proxy" tabindex="-1"><a class="header-anchor" href="#sidecar-proxy"><span>Sidecar Proxy</span></a></h2><p>Sidecar Proxy는 애플리케이션 컨테이너와 함께 동일 Pod상에 배포됨으로 localhost 로 통신할 수 있습니다. 사용자가 다른서비스에 대한 요청을 Sidecar Proxy에 지정하면 해당 요청을 맵핑된 다른 서비스로 전달합니다. 이 방식은 기존 개발자가 로컬에서 개발하는 환경과 동일하게 동작합니다. UI웹을 로컬 9090포트로 실행하고 백엔드 앱을 8080 포트로 실행한경우 UI웹은 백엔드 앱을 <code>localhost:8080</code> 으로 호출합니다. Consul Sidecar Proxy는 localhost 로 요청되는 포트를 지정한 <code>Upstream</code> 서비스로 전달하는 규칙을 처리하며, 여기에는 mTLS가 자동으로 구성됩니다.</p><h2 id="intention-규칙-추가" tabindex="-1"><a class="header-anchor" href="#intention-규칙-추가"><span>Intention 규칙 추가</span></a></h2><p>Sidecar Proxy의 서비스 접근 제어를 위해 모든 서비스에 대한 Deny 구성을 수행합니다. UI의 좌측 메뉴의 <code>Intention</code>을 클릭하고 우측의 <code>Create</code> 버튼을 클릭하여 모든 서비스 (엔터프라이즈의 경우 모든 Namespace 포함) 간에 Deny 규칙을 생성합니다.</p><figure><img src="'+i+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="service-구성" tabindex="-1"><a class="header-anchor" href="#service-구성"><span>Service 구성</span></a></h2><p>테스트 구성을 저장하기 위한 디렉토리를 생성합니다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">mkdir</span> ./k8s_config</span>
<span class="line"></span></code></pre></div><h3 id="백엔드-서비스" tabindex="-1"><a class="header-anchor" href="#백엔드-서비스"><span>백엔드 서비스</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./k8s_config/api.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ServiceAccount</span>
<span class="line">metadata:</span>
<span class="line">  name: api-v1</span>
<span class="line">---</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Service</span>
<span class="line">metadata:</span>
<span class="line">  name: api-v1</span>
<span class="line">spec:</span>
<span class="line">  selector:</span>
<span class="line">    app: api-v1</span>
<span class="line">  ports:</span>
<span class="line">    - port: 9091</span>
<span class="line">      targetPort: 9091</span>
<span class="line">---</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: api-v1</span>
<span class="line">  labels:</span>
<span class="line">    app: api-v1</span>
<span class="line">spec:</span>
<span class="line">  replicas: 1</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: api-v1</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      labels:</span>
<span class="line">        app: api-v1</span>
<span class="line">      annotations:</span>
<span class="line">        consul.hashicorp.com/connect-inject: &#39;true&#39;</span>
<span class="line">    spec:</span>
<span class="line">      serviceAccountName: api-v1</span>
<span class="line">      containers:</span>
<span class="line">        - name: api</span>
<span class="line">          image: nicholasjackson/fake-service:v0.7.8</span>
<span class="line">          ports:</span>
<span class="line">            - containerPort: 9091</span>
<span class="line">          env:</span>
<span class="line">            - name: &#39;LISTEN_ADDR&#39;</span>
<span class="line">              value: &#39;127.0.0.1:9091&#39;</span>
<span class="line">            - name: &#39;NAME&#39;</span>
<span class="line">              value: &#39;api-v1&#39;</span>
<span class="line">            - name: &#39;MESSAGE&#39;</span>
<span class="line">              value: &#39;Response from API v1&#39;</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="프론트엔드-서비스" tabindex="-1"><a class="header-anchor" href="#프론트엔드-서비스"><span>프론트엔드 서비스</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./k8s_config/web.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ServiceAccount</span>
<span class="line">metadata:</span>
<span class="line">  name: web</span>
<span class="line">---</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Service</span>
<span class="line">metadata:</span>
<span class="line">  name: web</span>
<span class="line">spec:</span>
<span class="line">  selector:</span>
<span class="line">    app: web</span>
<span class="line">  ports:</span>
<span class="line">    - port: 9090</span>
<span class="line">      targetPort: 9090</span>
<span class="line">---</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: web-deployment</span>
<span class="line">  labels:</span>
<span class="line">    app: web</span>
<span class="line">spec:</span>
<span class="line">  replicas: 1</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: web</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      labels:</span>
<span class="line">        app: web</span>
<span class="line">      annotations:</span>
<span class="line">        consul.hashicorp.com/connect-inject: &#39;true&#39;</span>
<span class="line">        consul.hashicorp.com/connect-service-upstreams: &#39;api-v1:9091&#39;</span>
<span class="line">    spec:</span>
<span class="line">      serviceAccountName: web</span>
<span class="line">      containers:</span>
<span class="line">        - name: web</span>
<span class="line">          image: nicholasjackson/fake-service:v0.7.8</span>
<span class="line">          ports:</span>
<span class="line">            - containerPort: 9090</span>
<span class="line">          env:</span>
<span class="line">            - name: &#39;LISTEN_ADDR&#39;</span>
<span class="line">              value: &#39;0.0.0.0:9090&#39;</span>
<span class="line">            - name: &#39;UPSTREAM_URIS&#39;</span>
<span class="line">              value: &#39;http://localhost:9091&#39;</span>
<span class="line">            - name: &#39;NAME&#39;</span>
<span class="line">              value: &#39;web&#39;</span>
<span class="line">            - name: &#39;MESSAGE&#39;</span>
<span class="line">              value: &#39;Hello World&#39;</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>프론트엔드 서비스에 <code>Deployment</code> 구성 내용의 <code>annotation</code> 을 확인하세요. 이 형식은 9091로 요청된 localhost로의 요청을 sidecar가 <code>api-v1</code>서비스로 전달하는 것을 의미합니다.</p><ul><li><code>consul.hashicorp.com/connect-service-upstreams: &#39;api-v1:9091&#39;</code></li></ul><h2 id="서비스-배포-및-등록-확인" tabindex="-1"><a class="header-anchor" href="#서비스-배포-및-등록-확인"><span>서비스 배포 및 등록 확인</span></a></h2><p><code>kubectl apply</code> 명령을 통해 배포를 확인하고 Consul UI에서 확인합니다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl apply <span class="token parameter variable">-f</span> ./k8s_config/api.yaml</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 출력</span></span>
<span class="line">serviceaccount/api-v1 created</span>
<span class="line">service/api-v1 created</span>
<span class="line">deployment.apps/api-v1 created</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl apply <span class="token parameter variable">-f</span> ./k8s_config/web.yaml</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 출력</span></span>
<span class="line">serviceaccount/web created</span>
<span class="line">service/web created</span>
<span class="line">deployment.apps/web-deployment created</span>
<span class="line"></span></code></pre></div><p>UI에 접속하고 좌측 Namespace에서 사용중인 Namespace를 확인합니다. 서비스 목록에 <code>api-v1</code>, <code>web</code> 이 등록되고 상태가 정상임을 확인합니다.</p><figure><img src="`+l+`" alt="Services - Consul 2022-02-19 19-21-21" tabindex="0" loading="lazy"><figcaption>Services - Consul 2022-02-19 19-21-21</figcaption></figure><p><code>port-forward</code>를 통해 로컬에서 web 앱을 확인합니다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl port-forward service/web <span class="token number">9090</span>:9090 <span class="token parameter variable">--address</span> <span class="token number">0.0</span>.0.0</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 출력</span></span>
<span class="line">Forwarding from <span class="token number">0.0</span>.0.0:9090 -<span class="token operator">&gt;</span> <span class="token number">9090</span></span>
<span class="line"></span></code></pre></div><p><a href="http://localhost:9090/ui" target="_blank" rel="noopener noreferrer">http://localhost:9090/ui</a> 에 브라우저로 접속하여 상태를 확인합니다.</p><figure><img src="`+c+'" alt="image-20220219192259588" tabindex="0" loading="lazy"><figcaption>image-20220219192259588</figcaption></figure><p>500 에러가 발생하였습니다. Consul Service Mesh는 서비스간 의도적으로 접속 가능여부를 동적으로 통제합니다. 이 기능을 <code>Intention</code> 이라고 부릅니다. Consul UI에 접속하여 <code>web</code> 서비스 이름을 클릭하면 다음과 같이 요청이 거부되어 있는것을 확인할 수 있습니다.</p><p>Intention 수정을 위해서는 권한이 필요합니다. 현재 환경에서는 전달받은 token (3108cbb3-005c-a3e4-9a42-6f13d1f5e4e6) 을 우측 상단 로그인에서 입력합니다.</p><figure><img src="'+p+'" alt="web - Consul 2022-02-19 19-24-22" tabindex="0" loading="lazy"><figcaption>web - Consul 2022-02-19 19-24-22</figcaption></figure><p><code>x</code> 표시를 클릭하여 <code>Create</code> 버튼을 클릭하여 Intention 규칙을 생성합니다. 이후에 연결이 허용된것을 확인할 수 있습니다.</p><figure><img src="'+t+'" alt="web - Consul 2022-02-19 19-26-03" tabindex="0" loading="lazy"><figcaption>web - Consul 2022-02-19 19-26-03</figcaption></figure><p>다시 <a href="http://localhost:9090/ui" target="_blank" rel="noopener noreferrer">http://localhost:9090/ui</a> 에 브라우저로 접속하여 상태를 확인합니다.</p><figure><img src="'+d+`" alt="image-20220219192915371" tabindex="0" loading="lazy"><figcaption>image-20220219192915371</figcaption></figure><p>다음 과정을 진행하기 위해 기존 적용된 구성을 삭제합니다.</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">kubectl delete <span class="token parameter variable">-f</span> ./k8s_config</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment"># 출력</span></span>
<span class="line">serviceaccount <span class="token string">&quot;api-v1&quot;</span> deleted</span>
<span class="line"><span class="token function">service</span> <span class="token string">&quot;api-v1&quot;</span> deleted</span>
<span class="line">deployment.apps <span class="token string">&quot;api-v1&quot;</span> deleted</span>
<span class="line">serviceaccount <span class="token string">&quot;web&quot;</span> deleted</span>
<span class="line"><span class="token function">service</span> <span class="token string">&quot;web&quot;</span> deleted</span>
<span class="line">deployment.apps <span class="token string">&quot;web-deployment&quot;</span> deleted</span>
<span class="line"></span></code></pre></div><h2 id="with-namespace-ent" tabindex="-1"><a class="header-anchor" href="#with-namespace-ent"><span>With Namespace (Ent)</span></a></h2><p>백엔드 서비스를 다른 Namespace에 배포하고, 프론트엔드가 해당 백엔드에 접근할 수 있도록 수정합니다.</p><h3 id="프론트엔드-서비스-1" tabindex="-1"><a class="header-anchor" href="#프론트엔드-서비스-1"><span>프론트엔드 서비스</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">cat</span> <span class="token operator">&gt;</span> ./k8s_config/web.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ServiceAccount</span>
<span class="line">metadata:</span>
<span class="line">  name: web</span>
<span class="line">---</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Service</span>
<span class="line">metadata:</span>
<span class="line">  name: web</span>
<span class="line">spec:</span>
<span class="line">  selector:</span>
<span class="line">    app: web</span>
<span class="line">  ports:</span>
<span class="line">    - port: 9090</span>
<span class="line">      targetPort: 9090</span>
<span class="line">---</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: web-deployment</span>
<span class="line">  labels:</span>
<span class="line">    app: web</span>
<span class="line">spec:</span>
<span class="line">  replicas: 1</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: web</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      labels:</span>
<span class="line">        app: web</span>
<span class="line">      annotations:</span>
<span class="line">        consul.hashicorp.com/connect-inject: &#39;true&#39;</span>
<span class="line">        consul.hashicorp.com/connect-service-upstreams: &#39;api-v1.&lt;namespace&gt;:9091&#39;</span>
<span class="line">    spec:</span>
<span class="line">      serviceAccountName: web</span>
<span class="line">      containers:</span>
<span class="line">        - name: web</span>
<span class="line">          image: nicholasjackson/fake-service:v0.7.8</span>
<span class="line">          ports:</span>
<span class="line">            - containerPort: 9090</span>
<span class="line">          env:</span>
<span class="line">            - name: &#39;LISTEN_ADDR&#39;</span>
<span class="line">              value: &#39;0.0.0.0:9090&#39;</span>
<span class="line">            - name: &#39;UPSTREAM_URIS&#39;</span>
<span class="line">              value: &#39;http://localhost:9091&#39;</span>
<span class="line">            - name: &#39;NAME&#39;</span>
<span class="line">              value: &#39;web&#39;</span>
<span class="line">            - name: &#39;MESSAGE&#39;</span>
<span class="line">              value: &#39;Hello World&#39;</span>
<span class="line">EOF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>프론트엔드 서비스에 <code>Deployment</code> 구성 내용의 <code>annotation</code> 을 확인하세요. 이 형식은 9091로 요청된 localhost로의 요청을 sidecar가 <code>&lt;namespace&gt;</code> Namespace의 <code>api-v1</code>서비스로 전달하는 것을 의미합니다.</p><ul><li><code>consul.hashicorp.com/connect-service-upstreams: &#39;api-v1.&lt;namespace&gt;:9091&#39;</code></li></ul><p>또한 Namespace 간 Intention을 작성하여 적용해야합니다.</p><h2 id="정리" tabindex="-1"><a class="header-anchor" href="#정리"><span>정리</span></a></h2><ul><li>이 단계에서는 두개의 앱을 이용하여 Service Mesh를 구성하기위한 Sidecar Proxy를 통해 통신하는 방식을 확인하였습니다.</li><li>Sidecar Proxy에는 Consul이 정책을 주입할 수 있으므로, 기존 Firewall 방식이 아닌 서비스간 의도적인 연결의 정의를 통해 허용/비허용 됨을 확인하였습니다.</li></ul><div class="hint-container tip"><p class="hint-container-title">참고 - Intention 순위</p><p>범위가 좁을수록 우선순위가 높습니다.</p><table><thead><tr><th>Source Namespace</th><th>Source Name</th><th>Destination Namespace</th><th>Destination Name</th><th>높을수록 서열 높음</th></tr></thead><tbody><tr><td>Exact</td><td>Exact</td><td>Exact</td><td>Exact</td><td>9</td></tr><tr><td>Exact</td><td><code>*</code></td><td>Exact</td><td>Exact</td><td>8</td></tr><tr><td><code>*</code></td><td><code>*</code></td><td>Exact</td><td>Exact</td><td>7</td></tr><tr><td>Exact</td><td>Exact</td><td>Exact</td><td><code>*</code></td><td>6</td></tr><tr><td>Exact</td><td><code>*</code></td><td>Exact</td><td><code>*</code></td><td>5</td></tr><tr><td><code>*</code></td><td><code>*</code></td><td>Exact</td><td><code>*</code></td><td>4</td></tr><tr><td>Exact</td><td>Exact</td><td><code>*</code></td><td><code>*</code></td><td>3</td></tr><tr><td>Exact</td><td><code>*</code></td><td><code>*</code></td><td><code>*</code></td><td>2</td></tr><tr><td><code>*</code></td><td><code>*</code></td><td><code>*</code></td><td><code>*</code></td><td>1</td></tr></tbody></table></div>`,53),v=[o];function m(u,b){return n(),a("div",null,v)}const k=s(r,[["render",m],["__file","02-SideCar.html.vue"]]),f=JSON.parse('{"path":"/04-HashiCorp/04-Consul/06-on_Kubernetes/ServiceMesh101/02-SideCar.html","title":"02. SideCar","lang":"ko-KR","frontmatter":{"description":"Consul Service Mesh on Kubernetes (Ent)","tag":["Consul","ServiceMesh","K8s","Kubernetes"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/04-Consul/06-on_Kubernetes/ServiceMesh101/02-SideCar.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"02. SideCar"}],["meta",{"property":"og:description","content":"Consul Service Mesh on Kubernetes (Ent)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://learn.hashicorp.com/img/consul/web-api-proxy.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"ServiceMesh"}],["meta",{"property":"article:tag","content":"K8s"}],["meta",{"property":"article:tag","content":"Kubernetes"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"02. SideCar\\",\\"image\\":[\\"https://learn.hashicorp.com/img/consul/web-api-proxy.png\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Sidecar Proxy","slug":"sidecar-proxy","link":"#sidecar-proxy","children":[]},{"level":2,"title":"Intention 규칙 추가","slug":"intention-규칙-추가","link":"#intention-규칙-추가","children":[]},{"level":2,"title":"Service 구성","slug":"service-구성","link":"#service-구성","children":[{"level":3,"title":"백엔드 서비스","slug":"백엔드-서비스","link":"#백엔드-서비스","children":[]},{"level":3,"title":"프론트엔드 서비스","slug":"프론트엔드-서비스","link":"#프론트엔드-서비스","children":[]}]},{"level":2,"title":"서비스 배포 및 등록 확인","slug":"서비스-배포-및-등록-확인","link":"#서비스-배포-및-등록-확인","children":[]},{"level":2,"title":"With Namespace (Ent)","slug":"with-namespace-ent","link":"#with-namespace-ent","children":[{"level":3,"title":"프론트엔드 서비스","slug":"프론트엔드-서비스-1","link":"#프론트엔드-서비스-1","children":[]}]},{"level":2,"title":"정리","slug":"정리","link":"#정리","children":[]}],"git":{"createdTime":1645936869000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":10.68,"words":641},"filePathRelative":"04-HashiCorp/04-Consul/06-on_Kubernetes/ServiceMesh101/02-SideCar.md","localizedDate":"2022년 2월 27일","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<p>실습을 위한 조건은 다음과 같습니다.</p>\\n<ul>\\n<li>Consul 이 구성된 Kubernetes 환경</li>\\n<li>설치 구성 시 <code>connectInject</code> 이 활성화 되어있어야 합니다.</li>\\n</ul>\\n</div>\\n<blockquote>\\n<p>참고 : <a href=\\"https://learn.hashicorp.com/tutorials/consul/service-mesh-application-secure-networking?in=consul/kubernetes\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://learn.hashicorp.com/tutorials/consul/service-mesh-application-secure-networking?in=consul/kubernetes</a></p>\\n</blockquote>"}');export{k as comp,f as data};
