import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as r,c as a,h as t}from"./app-DhMJQ1_3.js";const o={},l=t('<h1 id="_2022년-9월" tabindex="-1"><a class="header-anchor" href="#_2022년-9월"><span>2022년 9월</span></a></h1><h2 id="product-소개" tabindex="-1"><a class="header-anchor" href="#product-소개"><span>Product 소개</span></a></h2><ul><li><p>CDKTF (Cloud Development Kit for Terraform) General Available</p><ul><li><a href="https://www.hashicorp.com/blog/cdk-for-terraform-now-generally-available" target="_blank" rel="noopener noreferrer">Hashicorp Blog</a></li><li>Python, Go 등 프로그래밍 언어 기반으로 Terraform 을 활용하실 수 있도록 지원하는 CDKTF 가 정식 출시 되었습니다. CDKTF를 사용하면 개발자는 익숙한 프로그래밍 언어에서 컨텍스트 전환 없이 코드로 인프라를 설정할 수 있으며, 애플리케이션 비즈니스 로직을 정의하는 데 사용하는 인프라 리소스를 프로비저닝하기 위해 동일한 도구와 구문을 사용할 수 있습니다. 팀은 익숙한 구문으로 협업하면서 Terraform 에코시스템의 기능을 계속 활용하고 확립된 Terraform 배포 파이프라인을 통해 인프라 구성을 배포할 수 있습니다.</li><li>참고문서 1: <a href="https://github.com/hashicorp/terraform-cdk/blob/main/CHANGELOG.md#0120" target="_blank" rel="noopener noreferrer">CDK for Terraform v0.12: CHANGELOG</a></li><li>참고문서 2: <a href="https://www.terraform.io/cdktf?_gl=1*1sc3uq2*_ga*MjA4NTc1MTMyNy4xNjM4OTUwNzQ3*_ga_P7S46ZYEKW*MTY2MTMxOTcxNS4xMzQuMS4xNjYxMzIxMjUxLjAuMC4w" target="_blank" rel="noopener noreferrer">CDKTF Overview</a></li><li>참고문서 3: <a href="https://learn.hashicorp.com/collections/terraform/cdktf?_gl=1*1wv13qn*_ga*MjA4NTc1MTMyNy4xNjM4OTUwNzQ3*_ga_P7S46ZYEKW*MTY2MTMxOTcxNS4xMzQuMS4xNjYxMzIxMTcxLjAuMC4w" target="_blank" rel="noopener noreferrer">CDKTF Tutorials</a></li></ul></li></ul><h2 id="product-update" tabindex="-1"><a class="header-anchor" href="#product-update"><span>Product Update</span></a></h2><ul><li><p>Terraform</p><ul><li><p>CLI</p><ul><li><p><a href="https://github.com/hashicorp/terraform/releases/tag/v1.2.8" target="_blank" rel="noopener noreferrer">1.28 Release</a></p><ul><li>tolist, tomap, toset 등 type 변환 작업 시 변환 대상 type 유추로 인한 panic 이 발생하는 오류 개선</li></ul></li><li><p><a href="https://www.terraform.io/enterprise/releases" target="_blank" rel="noopener noreferrer">Enterprise Release</a></p><ul><li><p><a href="https://www.terraform.io/enterprise/releases/2022/v202208-3" target="_blank" rel="noopener noreferrer">8월 Release</a> 출시 (v202208-3)</p></li><li><p>필수 Upgrade Version: Release Note 에서 * 표기된 Version 은 필수로 거쳐야 하는 Version (예: v202207-2, v202204-2)</p></li><li><p>VCS 기반 Workspace 생성 시 정의된 variable 에 대한 type 검증 및 오류 안내 기능 추가</p></li><li><p>Known Issue: TFE 내부 모듈 중 하나인 Postgres - ver 10 또는 11 에 대한 Migration 실패 오류 개선 (v202208-2)</p></li><li><p>Run Pipeline 에 대한 Metric 정보가 Prometheus 에 표시 되지 않는 이슈 개선</p></li><li><p>Module Registry Protocol endpoint 인 &#39;/v1/modules/{namespace}/{name}/{provider}/versions&#39; 에서 version 갯수가 많은 Module 처리시 발생하는 오류 개선</p></li></ul></li></ul></li><li><p>Provider</p><ul><li><a href="https://github.com/hashicorp/terraform-provider-aws/releases/tag/v4.27.0" target="_blank" rel="noopener noreferrer">AWS v4.27.0 주요 수정사항</a><ul><li>networkmanager 관련 resource 추가</li><li>firewall data source에 대한 capacity_usage_summary, firewall_status 등 argument 추가</li><li>lb_target_group resource 에 대한 ip_address_type argument 추가</li><li>aws_db_instance resource 에 대한 특정 argument 수정 시 발생하는 &#39;InvalidParameterCombination: No modifications were requested&#39; 오류 개선</li><li>aws_opsworks resource 에 대한 region 정보 및 tag 적용 관련 오류 개선</li></ul></li><li><a href="https://github.com/hashicorp/terraform-provider-azurerm/releases/tag/v3.19.1" target="_blank" rel="noopener noreferrer">Azure v3.19.1 주요 수정사항</a><ul><li>azurerm_dns resource 에 대해 resource ID parsing 시 발생하는 대소문자 관련 오류 개선</li></ul></li><li><a href="https://github.com/hashicorp/terraform-provider-google/releases/tag/v4.33.0" target="_blank" rel="noopener noreferrer">GCP v4.33.0 주요 수정사항</a><ul><li>google_cloudfunctions2_function resource 추가</li><li>google_container_cluster 에 대해 authenticator_groups_config 지원</li><li>google_cloud_sql resource 에 대해 password_validation_policy argument 추가</li><li>google_dns_managed_zone data source 에 대해 managed_zone_id argument 추가</li><li>google_bigquery_data_transfer_config 에 대해 display_name 강제 변경 오류 개선</li></ul></li></ul></li></ul></li><li><p>Vault</p><ul><li><a href="https://github.com/hashicorp/vault/blob/main/CHANGELOG.md#1112" target="_blank" rel="noopener noreferrer">1.11.2 주요 수정사항</a><ul><li>Vaunt Agent 사용 시 keep_alives 비활성화 설정 지원</li><li>잘못된 Server Side Consistent Token 에 대해 500 이 아닌 403 에러 출력</li><li>UI 에서 제공 되는 JWT auth method 관련 log 정보 개선</li></ul></li></ul></li><li><p>Consul</p><ul><li><a href="https://github.com/hashicorp/consul/releases/tag/v1.13.1" target="_blank" rel="noopener noreferrer">1.13.1 주요 수정사항</a><ul><li>snapshot 관련 호환성 이슈 개선</li><li>grpc peering 관련 오류 개선</li></ul></li></ul></li><li><p>Nomad</p><ul><li><a href="https://github.com/hashicorp/nomad/releases/tag/v1.3.3" target="_blank" rel="noopener noreferrer">1.3.3 주요 수정사항</a><ul><li>CSI Plugin 에 대한 stage_publish_base_dir 통해 특정 stage / publishing directory mount 지원</li><li>qemu 에 대한 socket file 명 축약 기능 지원</li><li>만료된 일회성 token 의 timestamp 관련 오류 개선</li><li>UI 의 Evaluation tab 에서 일부 누락된 정보 출력 개선</li><li>task 가 사용하는 메모리가 0 으로 출력되는 오류 개선</li></ul></li></ul></li></ul>',5),i=[l];function n(p,s){return r(),a("div",null,i)}const h=e(o,[["render",n],["__file","2022-09.html.vue"]]),m=JSON.parse('{"path":"/04-HashiCorp/08-Updates/99-2022/2022-09.html","title":"2022년 9월","lang":"ko-KR","frontmatter":{"description":"2022년 9월 Update","tag":["Hashicorp","Update","Sep"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/08-Updates/99-2022/2022-09.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"2022년 9월"}],["meta",{"property":"og:description","content":"2022년 9월 Update"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2023-09-18T13:12:54.000Z"}],["meta",{"property":"article:tag","content":"Hashicorp"}],["meta",{"property":"article:tag","content":"Update"}],["meta",{"property":"article:tag","content":"Sep"}],["meta",{"property":"article:modified_time","content":"2023-09-18T13:12:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2022년 9월\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-18T13:12:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Product 소개","slug":"product-소개","link":"#product-소개","children":[]},{"level":2,"title":"Product Update","slug":"product-update","link":"#product-update","children":[]}],"git":{"createdTime":1662203164000,"updatedTime":1695042774000,"contributors":[{"name":"najihun","email":"51940925+najihun@users.noreply.github.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":1}]},"readingTime":{"minutes":4.15,"words":249},"filePathRelative":"04-HashiCorp/08-Updates/99-2022/2022-09.md","localizedDate":"2022년 9월 3일","excerpt":"\\n<h2>Product 소개</h2>\\n<ul>\\n<li>\\n<p>CDKTF (Cloud Development Kit for Terraform) General Available</p>\\n<ul>\\n<li><a href=\\"https://www.hashicorp.com/blog/cdk-for-terraform-now-generally-available\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Hashicorp Blog</a></li>\\n<li>Python, Go 등 프로그래밍 언어 기반으로 Terraform 을 활용하실 수 있도록 지원하는 CDKTF 가 정식 출시 되었습니다. CDKTF를 사용하면 개발자는 익숙한 프로그래밍 언어에서 컨텍스트 전환 없이 코드로 인프라를 설정할 수 있으며, 애플리케이션 비즈니스 로직을 정의하는 데 사용하는 인프라 리소스를 프로비저닝하기 위해 동일한 도구와 구문을 사용할 수 있습니다. 팀은 익숙한 구문으로 협업하면서 Terraform 에코시스템의 기능을 계속 활용하고 확립된 Terraform 배포 파이프라인을 통해 인프라 구성을 배포할 수 있습니다.</li>\\n<li>참고문서 1: <a href=\\"https://github.com/hashicorp/terraform-cdk/blob/main/CHANGELOG.md#0120\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CDK for Terraform v0.12: CHANGELOG</a></li>\\n<li>참고문서 2: <a href=\\"https://www.terraform.io/cdktf?_gl=1*1sc3uq2*_ga*MjA4NTc1MTMyNy4xNjM4OTUwNzQ3*_ga_P7S46ZYEKW*MTY2MTMxOTcxNS4xMzQuMS4xNjYxMzIxMjUxLjAuMC4w\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CDKTF Overview</a></li>\\n<li>참고문서 3: <a href=\\"https://learn.hashicorp.com/collections/terraform/cdktf?_gl=1*1wv13qn*_ga*MjA4NTc1MTMyNy4xNjM4OTUwNzQ3*_ga_P7S46ZYEKW*MTY2MTMxOTcxNS4xMzQuMS4xNjYxMzIxMTcxLjAuMC4w\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CDKTF Tutorials</a></li>\\n</ul>\\n</li>\\n</ul>"}');export{h as comp,m as data};