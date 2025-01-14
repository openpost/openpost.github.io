import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{d as l,r as p,o as a,c as o,a as t,F as c,e as d,b as m,w as u,g,t as r,i as h}from"./app-DhMJQ1_3.js";const f=()=>[{path:"/01-Infrastructure/Linux/TroubleShooting/ssh-no-matching-host-key-type-found.html",title:"SSH returns - no matching host key type found",lang:"ko-KR",frontmatter:{description:"SSH returns - no matching host key type found.",tag:["ssh"],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Linux/TroubleShooting/ssh-no-matching-host-key-type-found.html"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"SSH returns - no matching host key type found"}],["meta",{property:"og:description",content:"SSH returns - no matching host key type found."}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:locale",content:"ko-KR"}],["meta",{property:"og:updated_time",content:"2024-04-09T01:23:44.000Z"}],["meta",{property:"article:tag",content:"ssh"}],["meta",{property:"article:modified_time",content:"2024-04-09T01:23:44.000Z"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"Article","headline":"SSH returns - no matching host key type found","image":[""],"dateModified":"2024-04-09T01:23:44.000Z","author":[]}']]},headers:[{level:2,title:"Issue",slug:"issue",link:"#issue",children:[]},{level:2,title:"해결 방법 1",slug:"해결-방법-1",link:"#해결-방법-1",children:[]},{level:2,title:"해결 방법 2",slug:"해결-방법-2",link:"#해결-방법-2",children:[]}],git:{createdTime:1712625824e3,updatedTime:1712625824e3,contributors:[{name:"Great-Stone",email:"hahohh@gmail.com",commits:1}]},readingTime:{minutes:1.22,words:73},filePathRelative:"01-Infrastructure/Linux/TroubleShooting/ssh-no-matching-host-key-type-found.md",localizedDate:"2024년 4월 9일",excerpt:`
<h2>Issue</h2>
<div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ <span class="token function">ssh</span> root@192.168.1.1</span>
<span class="line"></span>
<span class="line">Unable to negotiate with <span class="token number">192.168</span>.1.1 port <span class="token number">22</span>: no matching <span class="token function">host</span> key <span class="token builtin class-name">type</span> found. Their offer: ssh-rsa</span>
<span class="line"></span></code></pre></div>`},{path:"/01-Infrastructure/",title:"Infrastructure",lang:"ko-KR",frontmatter:{tag:["Infrastructure"],headerDepth:0,description:"Infrastructure Recent pages [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]",head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"Infrastructure"}],["meta",{property:"og:description",content:"Infrastructure Recent pages [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:locale",content:"ko-KR"}],["meta",{property:"og:updated_time",content:"2023-09-18T13:12:54.000Z"}],["meta",{property:"article:tag",content:"Infrastructure"}],["meta",{property:"article:modified_time",content:"2023-09-18T13:12:54.000Z"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"Article","headline":"Infrastructure","image":[""],"dateModified":"2023-09-18T13:12:54.000Z","author":[]}']]},headers:[{level:2,title:"Recent pages",slug:"recent-pages",link:"#recent-pages",children:[]}],git:{createdTime:1627556976e3,updatedTime:1695042774e3,contributors:[{name:"Administrator",email:"admin@example.com",commits:4},{name:"Great-Stone",email:"hahohh@gmail.com",commits:2}]},readingTime:{minutes:.97,words:58},filePathRelative:"01-Infrastructure/README.md",localizedDate:"2021년 7월 29일",excerpt:`
<h2>Recent pages</h2>
<ul>
  <li v-for="page in pages" :key="page.key">
    <a :to="page.path" href="undefined" target="_blank">{{ page.title }}</a>
    <span v-if="page.frontmatter.date">
      [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]
    </span>
  </li>
</ul>`,autoDesc:!0},{path:"/01-Infrastructure/Container/container_runtime_sheet.html",title:"Container Runtimes 비교 표",lang:"ko-KR",frontmatter:{description:"Container Runtimes 비교 표",tag:["container","docker","podman"],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Container/container_runtime_sheet.html"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"Container Runtimes 비교 표"}],["meta",{property:"og:description",content:"Container Runtimes 비교 표"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:locale",content:"ko-KR"}],["meta",{property:"og:updated_time",content:"2023-09-18T13:12:54.000Z"}],["meta",{property:"article:tag",content:"container"}],["meta",{property:"article:tag",content:"docker"}],["meta",{property:"article:tag",content:"podman"}],["meta",{property:"article:modified_time",content:"2023-09-18T13:12:54.000Z"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"Article","headline":"Container Runtimes 비교 표","image":[""],"dateModified":"2023-09-18T13:12:54.000Z","author":[]}']]},headers:[],git:{createdTime:1640262e6,updatedTime:1695042774e3,contributors:[{name:"Administrator",email:"admin@example.com",commits:1},{name:"Great-Stone",email:"hahohh@gmail.com",commits:1}]},readingTime:{minutes:2.88,words:173},filePathRelative:"01-Infrastructure/Container/container_runtime_sheet.md",localizedDate:"2021년 12월 23일",excerpt:`
<blockquote>
<p>update : 2021. 12. 23.</p>
</blockquote>
<table>
<thead>
<tr>
<th></th>
<th><strong>CRI-O</strong></th>
<th><strong>Containerd CRI plugin</strong></th>
<th><strong>Docker Engine</strong></th>
<th><strong>gVisor CRI plugin</strong></th>
<th><strong>CRI-O Kata Containers</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>sponsors</td>
<td>CNCF</td>
<td>CNCF</td>
<td>Docker Inc</td>
<td>Google</td>
<td>Intel</td>
</tr>
<tr>
<td>started</td>
<td>2016</td>
<td>2015</td>
<td>Mar 2013</td>
<td>2015</td>
<td>2017</td>
</tr>
<tr>
<td>version</td>
<td>1.23</td>
<td>1.19</td>
<td>20.10</td>
<td>release-20211129.0</td>
<td>1.13</td>
</tr>
<tr>
<td>runtime</td>
<td>runc (default)</td>
<td>containerd managing runc</td>
<td>runc</td>
<td>runsc</td>
<td>kata-runtime</td>
</tr>
<tr>
<td>kernel</td>
<td>shared</td>
<td>shared</td>
<td>shared</td>
<td>partially shared</td>
<td>isolated</td>
</tr>
<tr>
<td>syscall filtering</td>
<td>no</td>
<td>no</td>
<td>no</td>
<td>yes</td>
<td>no</td>
</tr>
<tr>
<td>kernel blobs</td>
<td>no</td>
<td>no</td>
<td>no</td>
<td>no</td>
<td>yes</td>
</tr>
<tr>
<td>footprint</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>30mb</td>
</tr>
<tr>
<td>start time</td>
<td>&lt;10ms</td>
<td>&lt;10ms</td>
<td>&lt;10ms</td>
<td>&lt;10ms</td>
<td>&lt;100ms</td>
</tr>
<tr>
<td>io performance</td>
<td>host performance</td>
<td>host performance</td>
<td>host performance</td>
<td>slow</td>
<td>host performance</td>
</tr>
<tr>
<td>network performance</td>
<td>host performance</td>
<td>host performance</td>
<td>host performance</td>
<td>slow (see comment)</td>
<td>close to host performance</td>
</tr>
<tr>
<td>Docs</td>
<td><a href="https://github.com/kubernetes-sigs/cri-o/" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes-sigs/cri-o/</a></td>
<td><a href="https://github.com/containerd/cri" target="_blank" rel="noopener noreferrer">https://github.com/containerd/cri</a></td>
<td><a href="https://github.com/moby/moby" target="_blank" rel="noopener noreferrer">https://github.com/moby/moby</a></td>
<td><a href="https://github.com/google/gvisor" target="_blank" rel="noopener noreferrer">https://github.com/google/gvisor</a></td>
<td><a href="https://github.com/kata-containers/runtime" target="_blank" rel="noopener noreferrer">https://github.com/kata-containers/runtime</a></td>
</tr>
<tr>
<td>장점</td>
<td>경량의 쿠버네티스 전용 Docker 데몬이 필요하지 않음 OpenShift의 기본 컨테이너 런타임 아마도 최고의 컨테이너 기본 런타임</td>
<td>최신 Docker Engine과 함께 기본적으로 설치됨 Kubernetes는 ContainerD를 직접 사용할 수 있으며, Docker또한 동일한 호스트에서 직접 사용할 수도 있음  DockerD 데몬을 실행할 필요가 없음</td>
<td>방대한 수의 사용자가 테스트하고 반복 한 가장 성숙한 런타임 seccomp, SELinux 및 AppArmor를 사용하여 강화할 수 있음 가장 빠른 시작 시간  메모리 사용량이 가장 적음</td>
<td>gcloud appengine에서 고객 간의 격리 계층으로 사용함 상태를 저장하지 않는 웹 앱에 적합 표준 컨테이너에 두 개의 보안 계층을 추가함</td>
<td>아마도 가장 안전한 옵션 보안에 대한 주요 절충안으로 오버헤드가 발생하는것은 그렇게 나쁘지 않은 것으로 보임</td>
</tr>
<tr>
<td>단점</td>
<td>Docker Engine이 같고 있는 동일한 보안 이슈를 가지고 있음 보안정책을 별도로 관리해야 함</td>
<td>This is slightly newer as it has been through a few iterations of being installed differently.</td>
<td>Kubernetes는 <strong>CRI 플러그인 아키텍처로 이동하고 있음</strong> 보안을 강화하고 관리하는것은 너무 복잡함</td>
<td>버전이 지정되지 않았으며 아직 Kubernetes에서 프로덕션에 사용해서는 안됨 많은 syscall을 만드는 응용 프로그램에는 적합하지 않음 400 개 Linux syscall이 모두 구현되어 일부 앱이 작동하지 않을 수 있음 (예 : postgres).</td>
<td>kata-runtime 자체는 v1이지만 이것이 Kubernetes 상에서 어떻게 준비 되어 있는지  확인이 필요 30MB 메모리 오버 헤드로 인한 비효율적 패킹 시작 시간</td>
</tr>
</tbody>
</table>`},{path:"/01-Infrastructure/Linux/TroubleShooting/Oom_killer.html",title:"OOM Killer가 일하는 방식",lang:"ko-KR",frontmatter:{description:"oom_killer",tag:["linux","oom","oom_killer"],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Linux/TroubleShooting/Oom_killer.html"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"OOM Killer가 일하는 방식"}],["meta",{property:"og:description",content:"oom_killer"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:locale",content:"ko-KR"}],["meta",{property:"og:updated_time",content:"2023-09-18T13:12:54.000Z"}],["meta",{property:"article:tag",content:"linux"}],["meta",{property:"article:tag",content:"oom"}],["meta",{property:"article:tag",content:"oom_killer"}],["meta",{property:"article:modified_time",content:"2023-09-18T13:12:54.000Z"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"Article","headline":"OOM Killer가 일하는 방식","image":[""],"dateModified":"2023-09-18T13:12:54.000Z","author":[]}']]},headers:[{level:2,title:"OOM Killer의 주요 업무는 다음 두 가지입니다.",slug:"oom-killer의-주요-업무는-다음-두-가지입니다",link:"#oom-killer의-주요-업무는-다음-두-가지입니다",children:[]},{level:2,title:"각 프로세스의 oom_score 관련 정보는 /proc/(pid) 디렉토리 하위에서 찾을 수 있습니다.",slug:"각-프로세스의-oom-score-관련-정보는-proc-pid-디렉토리-하위에서-찾을-수-있습니다",link:"#각-프로세스의-oom-score-관련-정보는-proc-pid-디렉토리-하위에서-찾을-수-있습니다",children:[]},{level:2,title:"oom_killer는 점수를 나타내는 oom_score만 있으면 임무를 완수할 수 있습니다. 그렇다면 oom_adj와 oom_score_adj의 역할은 무엇일까요? man proc을 이용해 확인해 보겠습니다.",slug:"oom-killer는-점수를-나타내는-oom-score만-있으면-임무를-완수할-수-있습니다-그렇다면-oom-adj와-oom-score-adj의-역할은-무엇일까요-man-proc을-이용해-확인해-보겠습니다",link:"#oom-killer는-점수를-나타내는-oom-score만-있으면-임무를-완수할-수-있습니다-그렇다면-oom-adj와-oom-score-adj의-역할은-무엇일까요-man-proc을-이용해-확인해-보겠습니다",children:[]},{level:2,title:"위의 설명에 따르면 OOM Killer가 유일하게 의존하는 변수는 oom_score이고, oom_adj 또는 oom_score_adj을 이용해 그 값을 조정할 수 있습니다. 현재 사용하고 있는 커널 버전은 kernel-3.10.0-957.el7입니다. 리눅스 저장소에서 버전에 맞는 커널 소스 코드를 찾았습니다.",slug:"위의-설명에-따르면-oom-killer가-유일하게-의존하는-변수는-oom-score이고-oom-adj-또는-oom-score-adj을-이용해-그-값을-조정할-수-있습니다-현재-사용하고-있는-커널-버전은-kernel-3-10-0-957-el7입니다-리눅스-저장소에서-버전에-맞는-커널-소스-코드를-찾았습니다",link:"#위의-설명에-따르면-oom-killer가-유일하게-의존하는-변수는-oom-score이고-oom-adj-또는-oom-score-adj을-이용해-그-값을-조정할-수-있습니다-현재-사용하고-있는-커널-버전은-kernel-3-10-0-957-el7입니다-리눅스-저장소에서-버전에-맞는-커널-소스-코드를-찾았습니다",children:[]}],git:{createdTime:1640764183e3,updatedTime:1695042774e3,contributors:[{name:"Great-Stone",email:"hahohh@gmail.com",commits:1},{name:"ung",email:"swbs90@naver.com",commits:1}]},readingTime:{minutes:1.67,words:100},filePathRelative:"01-Infrastructure/Linux/TroubleShooting/Oom_killer.md",localizedDate:"2021년 12월 29일",excerpt:`
<h2>OOM Killer의 주요 업무는 다음 두 가지입니다.</h2>
<ul>
<li>실행 중인 모든 프로세스를 살펴보며 각 프로세스의 메모리 사용량에 따라 OOM 점수를 산출합니다.</li>
<li>OS에서 메모리가 더 필요하면 점수가 가장 높은 프로세스를 종료시킵니다.</li>
</ul>
<h2>각 프로세스의 oom_score 관련 정보는 /proc/(pid) 디렉토리 하위에서 찾을 수 있습니다.</h2>
<ul>
<li>oom_adj (oom_adjust)</li>
<li>oom_score_adj</li>
<li>oom_score</li>
</ul>`},{path:"/01-Infrastructure/Linux/TroubleShooting/SSH%20Too%20many%20authentication%20failures.html",title:"SSH Too many authentication failures",lang:"ko-KR",frontmatter:{description:"SSH Too many authentication failures",tag:["linux","ssh"],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Linux/TroubleShooting/SSH%20Too%20many%20authentication%20failures.html"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"SSH Too many authentication failures"}],["meta",{property:"og:description",content:"SSH Too many authentication failures"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:locale",content:"ko-KR"}],["meta",{property:"og:updated_time",content:"2023-09-18T13:12:54.000Z"}],["meta",{property:"article:tag",content:"linux"}],["meta",{property:"article:tag",content:"ssh"}],["meta",{property:"article:modified_time",content:"2023-09-18T13:12:54.000Z"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"Article","headline":"SSH Too many authentication failures","image":[""],"dateModified":"2023-09-18T13:12:54.000Z","author":[]}']]},headers:[{level:2,title:"해결 방법 1",slug:"해결-방법-1",link:"#해결-방법-1",children:[]},{level:2,title:"해결 방법 2",slug:"해결-방법-2",link:"#해결-방법-2",children:[]},{level:2,title:"해결 방법 3",slug:"해결-방법-3",link:"#해결-방법-3",children:[]}],git:{createdTime:162789431e4,updatedTime:1695042774e3,contributors:[{name:"Great-Stone",email:"hahohh@gmail.com",commits:2}]},readingTime:{minutes:1.95,words:117},filePathRelative:"01-Infrastructure/Linux/TroubleShooting/SSH Too many authentication failures.md",localizedDate:"2021년 8월 2일",excerpt:`
<p>직역하자면 <code>너무많은 인증 실패로 인한 SSH 접속이 안된다.</code> 는 메시지를 간혹 보게되는 경우가 있다.</p>
<div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">$ <span class="token function">ssh</span> myserver</span>
<span class="line">Received disconnect from <span class="token number">192.168</span>.0.43 port <span class="token number">22</span>:2: Too many authentication failures</span>
<span class="line">Connection to <span class="token number">192.168</span>.0.43 closed by remote host.</span>
<span class="line">Connection to <span class="token number">192.168</span>.0.43 closed.</span>
<span class="line"></span></code></pre></div>`},{path:"/01-Infrastructure/Linux/TroubleShooting/docker_bridge_netstat.html",title:"docker나 nomad를 이용하여 bridge모드로 기동된 컨테이너의 port 체크",lang:"ko-KR",frontmatter:{description:"docker bridge mode netstat",tag:["linux","docker","bridge","netstat"],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Linux/TroubleShooting/docker_bridge_netstat.html"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"docker나 nomad를 이용하여 bridge모드로 기동된 컨테이너의 port 체크"}],["meta",{property:"og:description",content:"docker bridge mode netstat"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:locale",content:"ko-KR"}],["meta",{property:"og:updated_time",content:"2023-09-18T13:12:54.000Z"}],["meta",{property:"article:tag",content:"linux"}],["meta",{property:"article:tag",content:"docker"}],["meta",{property:"article:tag",content:"bridge"}],["meta",{property:"article:tag",content:"netstat"}],["meta",{property:"article:modified_time",content:"2023-09-18T13:12:54.000Z"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"Article","headline":"docker나 nomad를 이용하여 bridge모드로 기동된 컨테이너의 port 체크","image":[""],"dateModified":"2023-09-18T13:12:54.000Z","author":[]}']]},headers:[{level:3,title:"먼저 찾으려는 컨테이너의 port를 확인한다. (nomad로 배포되어 있는 컨테이너임)",slug:"먼저-찾으려는-컨테이너의-port를-확인한다-nomad로-배포되어-있는-컨테이너임",link:"#먼저-찾으려는-컨테이너의-port를-확인한다-nomad로-배포되어-있는-컨테이너임",children:[]},{level:3,title:"먼저 일반적으로 사용하는 netstat에는 grafana 컨테이너의 http port인 25546이 확인되지 않는다.",slug:"먼저-일반적으로-사용하는-netstat에는-grafana-컨테이너의-http-port인-25546이-확인되지-않는다",link:"#먼저-일반적으로-사용하는-netstat에는-grafana-컨테이너의-http-port인-25546이-확인되지-않는다",children:[]},{level:3,title:"기동 중인 docker에서 inspect로 pid를 검색해오고 그 정보로 netstat를 다시하면 이제 LISTEN된 정보를 얻어올 수 있다.",slug:"기동-중인-docker에서-inspect로-pid를-검색해오고-그-정보로-netstat를-다시하면-이제-listen된-정보를-얻어올-수-있다",link:"#기동-중인-docker에서-inspect로-pid를-검색해오고-그-정보로-netstat를-다시하면-이제-listen된-정보를-얻어올-수-있다",children:[]}],git:{createdTime:1639634821e3,updatedTime:1695042774e3,contributors:[{name:"Great-Stone",email:"hahohh@gmail.com",commits:1},{name:"ung",email:"swbs90@naver.com",commits:1}]},readingTime:{minutes:5.28,words:317},filePathRelative:"01-Infrastructure/Linux/TroubleShooting/docker_bridge_netstat.md",localizedDate:"2021년 12월 16일",excerpt:`
<ul>
<li>단순 netstat만으로 bridge모드로 기동된 docker의 port를 체크할 수 없다</li>
<li>그래서 아래와 같은 절차가 필요하다.</li>
</ul>
<h3>먼저 찾으려는 컨테이너의 port를 확인한다. (nomad로 배포되어 있는 컨테이너임)</h3>
<div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">nomad alloc status d78d5b32</span>
<span class="line">ID                  <span class="token operator">=</span> d78d5b32-00c3-5468-284a-8c201058c53a</span>
<span class="line">Eval ID             <span class="token operator">=</span> c6c9a1d9</span>
<span class="line">Name                <span class="token operator">=</span> 08_grafana.08_grafana<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">Node ID             <span class="token operator">=</span> e11b7729</span>
<span class="line">Node Name           <span class="token operator">=</span> slave1</span>
<span class="line">Job ID              <span class="token operator">=</span> 08_grafana</span>
<span class="line">Job Version         <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">Client Status       <span class="token operator">=</span> running</span>
<span class="line">Client Description  <span class="token operator">=</span> Tasks are running</span>
<span class="line">Desired Status      <span class="token operator">=</span> run</span>
<span class="line">Desired Description <span class="token operator">=</span> <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span></span>
<span class="line">Created             <span class="token operator">=</span> 18h42m ago</span>
<span class="line">Modified            <span class="token operator">=</span> 2h36m ago</span>
<span class="line"></span>
<span class="line">Allocation Addresses <span class="token punctuation">(</span>mode <span class="token operator">=</span> <span class="token string">"bridge"</span><span class="token punctuation">)</span></span>
<span class="line">Label                   Dynamic  Address</span>
<span class="line">*http                   <span class="token function">yes</span>      <span class="token number">10.0</span>.0.161:25546</span>
<span class="line">*connect-proxy-grafana  <span class="token function">yes</span>      <span class="token number">10.0</span>.0.161:29382 -<span class="token operator">&gt;</span> <span class="token number">29382</span></span>
<span class="line"></span></code></pre></div>`},{path:"/01-Infrastructure/Container/",title:"Container",lang:"ko-KR",frontmatter:{title:"Container",article:!1,feed:!1,sitemap:!1,gitInclude:[],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Container/"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"Container"}],["meta",{property:"og:type",content:"website"}],["meta",{property:"og:locale",content:"ko-KR"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"WebPage","name":"Container"}']]},headers:[],git:{},readingTime:{minutes:.02,words:1},filePathRelative:null,excerpt:""},{path:"/01-Infrastructure/Linux/TroubleShooting/",title:"Trouble Shooting",lang:"ko-KR",frontmatter:{title:"Trouble Shooting",article:!1,feed:!1,sitemap:!1,gitInclude:[],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Linux/TroubleShooting/"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"Trouble Shooting"}],["meta",{property:"og:type",content:"website"}],["meta",{property:"og:locale",content:"ko-KR"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"WebPage","name":"Trouble Shooting"}']]},headers:[],git:{},readingTime:{minutes:.02,words:1},filePathRelative:null,excerpt:""},{path:"/01-Infrastructure/Linux/",title:"Linux",lang:"ko-KR",frontmatter:{title:"Linux",article:!1,feed:!1,sitemap:!1,gitInclude:[],head:[["meta",{property:"og:url",content:"https://docmoa.github.io/01-Infrastructure/Linux/"}],["meta",{property:"og:site_name",content:"docmoa"}],["meta",{property:"og:title",content:"Linux"}],["meta",{property:"og:type",content:"website"}],["meta",{property:"og:locale",content:"ko-KR"}],["script",{type:"application/ld+json"},'{"@context":"https://schema.org","@type":"WebPage","name":"Linux"}']]},headers:[],git:{},readingTime:{minutes:.02,words:1},filePathRelative:null,excerpt:""}],y=l({setup(){const n=f();return console.log(n),{pages:n}}}),k=t("h1",{id:"infrastructure",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#infrastructure"},[t("span",null,"Infrastructure")])],-1),b=t("h2",{id:"recent-pages",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#recent-pages"},[t("span",null,"Recent pages")])],-1),_={key:0};function T(n,S,x,I,R,v){const s=p("RouterLink");return a(),o("div",null,[k,b,t("ul",null,[(a(!0),o(c,null,d(n.pages,e=>(a(),o("li",{key:e.key},[m(s,{to:e.path},{default:u(()=>[g(r(e.title),1)]),_:2},1032,["to"]),e.frontmatter.date?(a(),o("span",_," [ "+r(new Date(e.frontmatter.date).toLocaleString())+" ] ",1)):h("",!0)]))),128))])])}const L=i(y,[["render",T],["__file","index.html.vue"]]),K=JSON.parse('{"path":"/01-Infrastructure/","title":"Infrastructure","lang":"ko-KR","frontmatter":{"tag":["Infrastructure"],"headerDepth":0,"description":"Infrastructure Recent pages [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]","head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/01-Infrastructure/"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Infrastructure"}],["meta",{"property":"og:description","content":"Infrastructure Recent pages [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Infrastructure"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Infrastructure\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Recent pages","slug":"recent-pages","link":"#recent-pages","children":[]}],"git":{"createdTime":1627556976000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":4},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":2}]},"readingTime":{"minutes":0.97,"words":58},"filePathRelative":"01-Infrastructure/README.md","localizedDate":"2021년 7월 29일","excerpt":"\\n<h2>Recent pages</h2>\\n<ul>\\n  <li v-for=\\"page in pages\\" :key=\\"page.key\\">\\n    <a :to=\\"page.path\\" href=\\"undefined\\" target=\\"_blank\\">{{ page.title }}</a>\\n    <span v-if=\\"page.frontmatter.date\\">\\n      [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]\\n    </span>\\n  </li>\\n</ul>","autoDesc":true}');export{L as comp,K as data};
