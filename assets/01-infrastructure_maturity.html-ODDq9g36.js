import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as a,a as e,h as r}from"./app-DhMJQ1_3.js";const n={},o=e("h1",{id:"인프라의-변화와-적응",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#인프라의-변화와-적응"},[e("span",null,"인프라의 변화와 적응")])],-1),l=e("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/HB3LMVLNi_Q",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1),s=r('<p>이번에는 인프라의 변화와 적응이라는 제목으로 인프라의 성숙도와 관련한 이야기를 나누고자 합니다.</p><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707110714298.png" alt="image-20200707110714298" tabindex="0" loading="lazy"><figcaption>image-20200707110714298</figcaption></figure><p>HashiCorp의 테라폼을 이야기하면서 함께 이야기되는 것은 언제나 Infrastructure as Code라는 IaC 입니다. 즉, 인프라는 코드로 설명되고로 테라폼은 이를 지원하는 멋진 툴입니다.</p><p>IaC는 많은 의미를 갖고 있지만, 이 이야기를 하기에 앞서 결국 이것도 코드 이기 때문에 최근의 DevOps 같은 맥락의 이야기를 할수 밖에 없을 것 같습니다.</p><p>사람이 과거에서 오늘날 까지 진화를 했든 우리의 인프라도 각 시기마다 적절한 운영 성숙도를 갖추었습니다.</p><h2 id="자동화와-그-변화에-대해" tabindex="-1"><a class="header-anchor" href="#자동화와-그-변화에-대해"><span>자동화와 그 변화에 대해</span></a></h2><h3 id="_1-manual-everything" tabindex="-1"><a class="header-anchor" href="#_1-manual-everything"><span>1. Manual Everything</span></a></h3><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200701184003515.png" alt="image-20200701184003515" tabindex="0" loading="lazy"><figcaption>image-20200701184003515</figcaption></figure><p>첫단계에서는 매뉴얼을 사용합니다. 인프라에 대한 모든 정보와 구성 방법, 변경 방법, 기존 아키텍쳐에 대한 내용은 문서로 관리되었습니다. 여전히 엑셀 시트를 가지고 인프라 아이피와 아이디, 서비스가 어떤게 올라가 있는지 관리하는 곳도 많이 있지요. 변경에 대한 모든 사항은 문서로 남겨야 하고, 그렇지 못한다면 기억에 의존해야 합니다.</p><ul><li>브레인 스토밍</li><li>아이디어 전달</li><li>컴퓨터가 이해할 수 없음</li><li>작업 계획을 기반으로 CLI 사용</li><li>낮은 재사용 성과 버전 관리</li><li>현재 상태를 유지할 수 없음</li></ul><h3 id="_2-basic-automation" tabindex="-1"><a class="header-anchor" href="#_2-basic-automation"><span>2. Basic Automation</span></a></h3><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/SBSEFUIa2AnSd8xKoXo-8J1HplKEGMY9UuFkqABcnfNkxjuSTg8yVk-C9WNFVSMUYaUdud_xjLoqPBp07hvCEYztIqveyuhoUWLZpXm694Ptp8y_mwMQbYIXq-NhVVZ_9ansWOi3_t0.png" alt="File:Script Shell.png - Wikimedia Commons" tabindex="0" loading="lazy"><figcaption>File:Script Shell.png - Wikimedia Commons</figcaption></figure><p>나름의 노하우를 담아 스크립팅 언어를 사용하여 작업합니다. 새로운 서버를 설정하거나 기능을 수행하기위한 작업으로 상당히 간단하고 편리합니다. 이단계에서는 비슷한 인프라나 애플리케이션 런타임이 일반적이고 조직간에 많은 의사 소통이 필요하지 않기 때문에 상당히 유용합니다. 일단 노가다를 많이 줄여줍니다. 특징은 다음과 같습니다.</p><ul><li>인적 오류 감소</li><li>반복 된 작업 자동화</li><li>시스템의 결과 또는 상태를 고려하여 실행</li><li>순서대로 각 단계를 실행</li><li>낮은 재사용 성과 버전 관리</li><li>현재 상태를 유지 불가</li><li>동일한 스크립트를 실행하고 분기를 통해 두 가지 혹은 그 이상의 결과</li><li>스크립트가 최종 상태를 이해하지 못함</li></ul><h3 id="_3-machine-virtualization" tabindex="-1"><a class="header-anchor" href="#_3-machine-virtualization"><span>3. Machine Virtualization</span></a></h3><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200706221237156.png" alt="image-20200706221237156" tabindex="0" loading="lazy"><figcaption>image-20200706221237156</figcaption></figure><p>이제 이미 설정된 머신을 가상화를 통해 미리 저장해두고 사용합니다. 미리 필요한 패키지나 솔루션을 설치해두고 바로 사용 가능합니다. 미리 이미지들을 만드는 작업을 수행하기 때문에 가상머신을 사용하면 자동화를 향상시킬 수 있고 공동작업도 향상됩니다.</p><ul><li>성숙된 툴링</li><li>재사용성 확보</li><li>스냅샷을 통한 수동적 상태 유지</li><li>가상화 되지 않은 부분은?</li><li>하이퍼 바이저에 의존적</li><li>서로 다른 API</li><li>이미지에 변경시 수작업 또는 스크립트 필요</li></ul><h3 id="_4-commoditization-of-infrastructure" tabindex="-1"><a class="header-anchor" href="#_4-commoditization-of-infrastructure"><span>4. Commoditization of Infrastructure</span></a></h3><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/ppkX01eIvJ1Qn1dYKIMr0ckfCWyeYQOiNXFGaMZJkoj1oC1XidCnwhbiUbeeKpbKkLasVSr0UvVQa49u4OAOXgEJv0u3CxbnOu7Pg61tpSJXwXG5aKck411ixrEF9SwnQDDb_oWVkbI.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>다음은 이제 우리가 기본적으로 컨트롤 가능한 클라우드 리소스와 함께하는 시대입니다. 인프라를 더이상 소유하지 않고 상품화된 인프라, 데이터 센터를 사용하기 위해서 우리는 자동화를 요구받기 시작합니다. API를 통해 더 많은 기술 계층을 가상화 하고 더 많은 소프트웨어와 자동화 기술로 지금의 데이터 센터의 컴퓨터를 포함한 인프라를 대신하는 환경을 제공합니다.</p><ul><li>빠른 시작</li><li>확장성</li><li>거의 모든 자동화 API 제공</li><li>제공자마다 상이한 API</li><li>애플리케이션 파편화</li><li>인적 자원 확보 필요</li></ul><h3 id="_5-datacenter-as-computer" tabindex="-1"><a class="header-anchor" href="#_5-datacenter-as-computer"><span>5. Datacenter as Computer</span></a></h3><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200706222116243.png" alt="image-20200706222116243" tabindex="0" loading="lazy"><figcaption>image-20200706222116243</figcaption></figure><p>이제 더 나아가 머신이 아닌 OS를 가상화 하기 시작합니다. 데이터 센터의 컴퓨터를 사용하는 대신 컴퓨터를 자원 풀의 하나로 여기고, 어디인지는 몰라도 애플리케이션을 적당한 리소스가 있는 그 어딘가에 배포합니다. 리소스 활용율을 높이고 이전 보다 더더더 자동화합니다. Agile이 요구되고 DevOps를 해야한다고 합니다.</p><ul><li>엄청 빠른 배포 전략</li><li>가용한 모든 리소스에 확장</li><li>자동화를 위한 자동화</li><li>자동화를 위한 인력 필요</li><li>기존 레거시의 보존</li></ul><h3 id="자동화-딜레마" tabindex="-1"><a class="header-anchor" href="#자동화-딜레마"><span>자동화 딜레마</span></a></h3><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707180213752.png" alt="image-20200707180213752" tabindex="0" loading="lazy"><figcaption>image-20200707180213752</figcaption></figure><p>더 많은 자동화를 하면 이론적으로 우리는 더 적은 일을 해야합니다. 하지만 전반적으로 자동화의 단계를 살펴보면 이론적으로 가상화를 늘리고 컨테이너화를 하는 것은 우리의 삶을 더 좋게 만들어야 하는데, 정말 그런가요? 때때로 자동화는 정말 무수히 많은 반복과 검증 작업이 필요하고 이전보다 더 많은 시간과 노력을 요구합니다. 자동화나 DevOps에대한 장난스럽지만 마음을 후비는 글들도 넘쳐나죠. 자동화를 했음에도 불구하고 다시 새로운 플랜을 실행해야 하는 상황이나 여전히 우리가 인프라를 대하는 마음가짐이 하드웨어로 바라보고 있는 시각 처럼 말입니다.</p><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707085213583.png" alt="image-20200707085213583" tabindex="0" loading="lazy"><figcaption>image-20200707085213583</figcaption></figure><p>아마도 유발하라리의 소설 사피엔스를 재미있게 보신 분들은 호모사피엔스 뿐만아니라 다른 종도 함께 살았었다는 흥미로운 가정을 하는 이야기를 보셨을 것입니다. (<s>다른종을 멸종시켰다고..</s>) 그리고 소설에서의 이야기 처럼 앞서 다룬 자동화외에도 수십, 혹은 수백가지의 자동화를 위한 <s>내 한몸 편하고자 하는</s> 몸부림이 현 시점에도 병렬로 존재합니다. 퍼블릭과 프라이빗 클라우드 환경이 도입되고 있고 VM과 베어메탈 환경은 여전히 존재합니다. 더불어 더작은 엣지, IoT 인프라도 관리의 대상이 되고 있습니다.</p><h2 id="infrastructure-as-code" tabindex="-1"><a class="header-anchor" href="#infrastructure-as-code"><span>Infrastructure as Code</span></a></h2><p>인프라의 자동화를 이야기 함에 있어 빼뜨릴 수 없는것이 Infrastructure as Code, IoC 입니다. 코드로서의 인프라스트럭쳐, IaC가 취하는 전략이 무엇일까요? 다년간의 경험을 가진 팀이 보유한 시스템 환경을 코드로 바꾸면 무엇이 달라질까요?</p><p>그럼 몇가지 상황을 제시해보겠습니다.</p><ul><li>수동으로 생성 한 환경을 관리해 보셨나요?</li><li>변경을 해야하는데 엔터를 누르기가 겁이 났었나요?</li><li>백업이 손상되고 서버가 충돌하는 상황이 우려스럽나요?</li><li>같은 환경을 재현할수 없는 상황이 있었나요?</li></ul><p>코드로 인프라를 관리한다는 것은 자유롭게 변경하고 환경을 이해하고 반복적으로 동일한 상황으로 만들 수 있다는 점입니다. 그리고 그 명세를 별도의 문서로 정리할 필요 없이 명확하게 인프라가 정의되어 남아있습니다.</p><figure><img src="https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707091154907.png" alt="image-20200707091154907" tabindex="0" loading="lazy"><figcaption>image-20200707091154907</figcaption></figure><h3 id="좋은-코드" tabindex="-1"><a class="header-anchor" href="#좋은-코드"><span>좋은 코드</span></a></h3><p>우선 잘 만들어지는, 좋은 인프라 자동화를 이야기 하기 앞서 그 조건을 만드는 좋은 코드의 특징을 찾아보고 몇가지 공통된 항목을 뽑아보고 다음과 같이 정리해보았습니다.</p><ul><li>잘 작동함</li><li>읽기 쉬움</li><li>모듈화됨</li><li>테스트 가능함</li><li>보기 좋음 (우아함)</li><li>관리가 쉬움</li><li>변경이 쉬움</li><li>간결함 (명확함)</li><li>효율적임</li></ul><p>이외에도 몇가지 더 있겠지만 이런 좋은 코드의 특징과 IaC가 어떤 관계가 있을까요? 인프라도 마치 좋은 코드처럼 관리가 가능하다는 것입니다. 앞서 자동화를 위해 문서화 했어야 했고, 종속성을 분석하여 관리하고 인프라 자원의 변경이 있을때마다 변경하고 그 결과물, 혹은 결과물을 만들어내는 도구를 관리하고 다시 사용할 수 있게 만드는 것. 그것은 좋은 코드와 좋은 인프라 자동화 방식이 같은 맥락으로 이어질 수 있도록 만들어주는 IaC의 특징입니다. 하지만 &#39;좋은&#39; 이라는 수식이 붙는 인프라의 자동화가 그저 쉽게만 되지는 않을 수 있습니다. 물론 인프라를 위한 좋은 코드는 연습이 필요합니다.</p><h3 id="iac-starting-with-terraform" tabindex="-1"><a class="header-anchor" href="#iac-starting-with-terraform"><span>IaC starting with Terraform</span></a></h3><p>인프라 프로비저닝의 최우선 목표는 재현 가능한 인프라를 코드로 제공하는 것입니다. DevOps팀이 CI/CD 워크플로우 내에서 익숙한 도구를 사용하여 리소스를 계획하고 프로비저닝을 할 수 있는 방법을 제공하는 것입니다. Terraform은 DevOps 팀이나 클라우드 팀에서 구성한 아키텍쳐를 코드로 템플릿화 하고 기본적인 리소스와 세분화된 프로비저닝을 처리할 수 있습니다. 이런 구성은 주요 인프라 관리 도구와 통합되고 모니터링, APM 시스템, 보안 도구, 네트워크 등을 포함하여 다른 많은 ISV 공급자의 서비스로 확장 할 수 있습니다. 정의된 템플릿은 자동화된 방식으로 필요에 따라 프로비저닝 하고, 이를 통해 Terraform은 퍼블릭과 프라이빗 클라우드에 리소스를 프로비저닝 하는 공통 워크플로우를 생성합니다.</p><h3 id="terraform-enterprise-workflow" tabindex="-1"><a class="header-anchor" href="#terraform-enterprise-workflow"><span>Terraform Enterprise Workflow</span></a></h3><p>그리고 엔터프라이즈 환경을 위한 지원은 무엇이 있을까요? Terraform Enterprise는 오픈 소스의 코드 프로비저닝으로 인프라 스트럭처에서 협업, 거버넌스 및 셀프 서비스 워크 플로우를 제공합니다. Terraform Enterprise는 팀이 협력하여 인프라를 구축 할 수 있도록 워크스페이스, 모듈과 모듈 레지스트리, 거버넌스를 위한 구성을 제공합니다.</p><p>모듈의 활용은 기존에 티켓 방식으로 수행하던 인프라 프로비저닝 워크플로우에서 인프라를 재사용 가능한 모듈에 코드로 패키지하여 개발자가 셀프 서비스 방식으로 신속하게 프로비저닝 할 수 있는 환경을 만들어 줍니다.</p><p>그리고 프로비저닝과 관련한 정책 및 코드 로깅을 통해 조직은 전체 배포를 보호, 관리 및 감사로그를 확인 할 수 있습니다.</p><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2><p>끊임없이 성장하고 확장되는 인프라 환경에서 Infrastructure as Code라는 아이디어가 탄생했습니다. IaC에 기반한 가치는 관리되는 프로비저닝으로 기존 레거시 환경과 퍼블릭/프라이빗 클라우드에 대한 비용을 최적화하고 기존 대비 빠른 속도와 위험 감소라는 측면에서 지금의 우리가 맞이하고 있는 현 시대에 적합한 모델이라고 볼 수 있습니다. DevOps의 핵심 구성요소기기도 하나 좋은 코드가 좋은 인프라를 만드는 것처럼 품질관릴와 체계적인 거버넌스를 구성하기 위한 노력이 반드시 필요한 영역입니다.</p>',49),c=[o,l,s];function m(p,u){return t(),a("div",null,c)}const d=i(n,[["render",m],["__file","01-infrastructure_maturity.html.vue"]]),f=JSON.parse('{"path":"/04-HashiCorp/03-Terraform/01-Information/01-infrastructure_maturity.html","title":"인프라의 변화와 적응","lang":"ko-KR","frontmatter":{"description":"인프라의 변화와 적응","tag":["terraform","IaC"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/03-Terraform/01-Information/01-infrastructure_maturity.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"인프라의 변화와 적응"}],["meta",{"property":"og:description","content":"인프라의 변화와 적응"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707110714298.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"terraform"}],["meta",{"property":"article:tag","content":"IaC"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"인프라의 변화와 적응\\",\\"image\\":[\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707110714298.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200701184003515.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/SBSEFUIa2AnSd8xKoXo-8J1HplKEGMY9UuFkqABcnfNkxjuSTg8yVk-C9WNFVSMUYaUdud_xjLoqPBp07hvCEYztIqveyuhoUWLZpXm694Ptp8y_mwMQbYIXq-NhVVZ_9ansWOi3_t0.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200706221237156.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/ppkX01eIvJ1Qn1dYKIMr0ckfCWyeYQOiNXFGaMZJkoj1oC1XidCnwhbiUbeeKpbKkLasVSr0UvVQa49u4OAOXgEJv0u3CxbnOu7Pg61tpSJXwXG5aKck411ixrEF9SwnQDDb_oWVkbI.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200706222116243.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707180213752.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707085213583.png\\",\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707091154907.png\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"자동화와 그 변화에 대해","slug":"자동화와-그-변화에-대해","link":"#자동화와-그-변화에-대해","children":[{"level":3,"title":"1. Manual Everything","slug":"_1-manual-everything","link":"#_1-manual-everything","children":[]},{"level":3,"title":"2. Basic Automation","slug":"_2-basic-automation","link":"#_2-basic-automation","children":[]},{"level":3,"title":"3. Machine Virtualization","slug":"_3-machine-virtualization","link":"#_3-machine-virtualization","children":[]},{"level":3,"title":"4. Commoditization of Infrastructure","slug":"_4-commoditization-of-infrastructure","link":"#_4-commoditization-of-infrastructure","children":[]},{"level":3,"title":"5. Datacenter as Computer","slug":"_5-datacenter-as-computer","link":"#_5-datacenter-as-computer","children":[]},{"level":3,"title":"자동화 딜레마","slug":"자동화-딜레마","link":"#자동화-딜레마","children":[]}]},{"level":2,"title":"Infrastructure as Code","slug":"infrastructure-as-code","link":"#infrastructure-as-code","children":[{"level":3,"title":"좋은 코드","slug":"좋은-코드","link":"#좋은-코드","children":[]},{"level":3,"title":"IaC starting with Terraform","slug":"iac-starting-with-terraform","link":"#iac-starting-with-terraform","children":[]},{"level":3,"title":"Terraform Enterprise Workflow","slug":"terraform-enterprise-workflow","link":"#terraform-enterprise-workflow","children":[]}]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"createdTime":1640262000000,"updatedTime":1695042774000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":1},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":3.47,"words":208},"filePathRelative":"04-HashiCorp/03-Terraform/01-Information/01-infrastructure_maturity.md","localizedDate":"2021년 12월 23일","excerpt":"\\n<iframe width=\\"560\\" height=\\"315\\" src=\\"https://www.youtube.com/embed/HB3LMVLNi_Q\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\" allowfullscreen=\\"\\"></iframe>\\n<p>이번에는 인프라의 변화와 적응이라는 제목으로 인프라의 성숙도와 관련한 이야기를 나누고자 합니다.</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/Great-Stone/images/master/uPic/image-20200707110714298.png\\" alt=\\"image-20200707110714298\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20200707110714298</figcaption></figure>"}');export{d as comp,f as data};