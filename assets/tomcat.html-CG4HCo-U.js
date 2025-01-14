import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o,c as r,b as u,w as a,h as t,a as n,g as s}from"./app-DhMJQ1_3.js";const d={},m=t('<h1 id="tomcat" tabindex="-1"><a class="header-anchor" href="#tomcat"><span>Tomcat</span></a></h1><ul><li>tomcat 다운로드 <ul><li>다운로드 받지않고 호스트에 미리 설치해 놓는 방식이 더 가벼워보임 --&gt; 아마도 Packer, Terraform의 조합이면 가능</li><li>다운로드 받게 구성하면 컨테이너처럼 Nomad가 배포할 때마다 다운받아서 구성 가능</li></ul></li><li>Template - server.xml <ul><li>server.xml 기본 구성에서 port가 선언되는 자리를 java option에서 받을 수 있도록 변경</li><li>Template 구성도 가능하고 미리 구성한 xml을 다운로드 받게 하는것도 괜찮아 보임</li></ul></li><li>Consul과 함께 구성된 경우 Nginx같은 LB 구성 Job 에서 backend를 동적으로 구성 가능</li></ul>',2),k=n("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/UvB_Zi6Plbc",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1),v=n("div",{class:"language-hcl line-numbers-mode","data-highlighter":"prismjs","data-ext":"hcl","data-title":"hcl"},[n("pre",{class:"language-hcl"},[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},"variables"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"tomcat_download_url"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"https://archive.apache.org/dist/tomcat/tomcat-10/v10.0.10/bin/apache-tomcat-10.0.10.tar.gz"')]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token comment"},"// https://tomcat.apache.org/tomcat-10.0-doc/appdev/sample/")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"war_download_url"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"https://tomcat.apache.org/tomcat-10.0-doc/appdev/sample/sample.war"')]),s(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("job "),n("span",{class:"token string"},'"tomcat-10"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"datacenters"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"dc1"'),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token comment"},'# namespace = "legacy"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"type"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"service"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("  group "),n("span",{class:"token string"},'"tomcat"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token property"},"count"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"1")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token keyword"},"scaling"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"enabled"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"min"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"1")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"max"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"3")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("    task "),n("span",{class:"token string"},'"tomcat"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"driver"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"raw_exec"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"resources"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token keyword"},"network"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("          port "),n("span",{class:"token string"},'"http"'),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("          port "),n("span",{class:"token string"},'"stop"'),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"cpu"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"500")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"memory"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"512")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"env"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"APP_VERSION"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"0.1"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"CATALINA_HOME"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},[s('"'),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("NOMAD_TASK_DIR"),n("span",{class:"token punctuation"},"}")]),s('/apache-tomcat-10.0.10"')])]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"CATALINA_OPTS"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"-Dport.http=$NOMAD_PORT_http -Dport.stop=$NOMAD_PORT_stop -Ddefault.context=$NOMAD_TASK_DIR -Xms256m -Xmx512m"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"JAVA_HOME"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"/usr/lib/jvm/java-11-openjdk-amd64"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"template"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[n("span",{class:"token property"},"data"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token heredoc string"},"<<EOF"),s(`
`),n("span",{class:"line"},'<?xml version="1.0" encoding="UTF-8"?>'),s(`
`),n("span",{class:"line"},'<Server port="${port.stop}" shutdown="SHUTDOWN">'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.startup.VersionLoggerListener"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener"/>'),s(`
`),n("span",{class:"line"},"    <GlobalNamingResources>"),s(`
`),n("span",{class:"line"},'        <Resource name="UserDatabase" auth="Container" type="org.apache.catalina.UserDatabase" description="User database that can be updated and saved" factory="org.apache.catalina.users.MemoryUserDatabaseFactory" pathname="conf/tomcat-users.xml"/>'),s(`
`),n("span",{class:"line"},"    </GlobalNamingResources>"),s(`
`),n("span",{class:"line"},'    <Service name="Catalina">'),s(`
`),n("span",{class:"line"},'        <Connector port="${port.http}" protocol="HTTP/1.1" connectionTimeout="20000"/>'),s(`
`),n("span",{class:"line"},'        <Engine name="Catalina" defaultHost="localhost">'),s(`
`),n("span",{class:"line"},'            <Realm className="org.apache.catalina.realm.LockOutRealm">'),s(`
`),n("span",{class:"line"},'                <Realm className="org.apache.catalina.realm.UserDatabaseRealm" resourceName="UserDatabase"/>'),s(`
`),n("span",{class:"line"},"            </Realm>"),s(`
`),n("span",{class:"line"},'            <Host name="localhost" appBase="${default.context}/webapps/" unpackWARs="true" autoDeploy="true">'),s(`
`),n("span",{class:"line"},'                <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log" suffix=".txt" pattern="%h %l %u %t &quot;%r&quot; %s %b"/>'),s(`
`),n("span",{class:"line"},"            </Host>"),s(`
`),n("span",{class:"line"},"        </Engine>"),s(`
`),n("span",{class:"line"},"    </Service>"),s(`
`),n("span",{class:"line"},"</Server>"),s(`
`),n("span",{class:"line"},"EOF")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"destination"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"local/conf/server.xml"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"artifact"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"source"),s(),n("span",{class:"token punctuation"},"="),s(" var.tomcat_download_url")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"destination"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"/local"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"artifact"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"source"),s(),n("span",{class:"token punctuation"},"="),s(" var.war_download_url")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"destination"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"/local/webapps"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"config"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"command"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},[s('"'),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("CATALINA_HOME"),n("span",{class:"token punctuation"},"}")]),s('/bin/catalina.sh"')])]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"args"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"run"'),s(", "),n("span",{class:"token string"},'"-config"'),s(", "),n("span",{class:"token string"},'"$NOMAD_TASK_DIR/conf/server.xml"'),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"service"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"name"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"legacy-tomcat"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"tags"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"tomcat"'),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"provider"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"nomad"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"port"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"http"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token keyword"},"check"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"type"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"tcp"')]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"interval"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"10s"')]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"timeout"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"2s"')]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"port"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"http"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=n("div",{class:"language-hcl line-numbers-mode","data-highlighter":"prismjs","data-ext":"hcl","data-title":"hcl"},[n("pre",{class:"language-hcl"},[n("code",null,[n("span",{class:"line"},[n("span",{class:"token keyword"},"variables"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"tomcat_download_url"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.18/bin/apache-tomcat-10.1.18.zip"')]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"war_download_url"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"https://tomcat.apache.org/tomcat-10.1-doc/appdev/sample/sample.war"')]),s(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("job "),n("span",{class:"token string"},'"tomcat-10"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"datacenters"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"dc1"'),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token comment"},'# namespace = "legacy"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token property"},"type"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"service"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("  group "),n("span",{class:"token string"},'"tomcat"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token property"},"count"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"1")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token keyword"},"scaling"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"enabled"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token boolean"},"true")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"min"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"1")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"max"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"3")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token keyword"},"network"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("      port "),n("span",{class:"token string"},'"http"'),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      port "),n("span",{class:"token string"},'"stop"'),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("    task "),n("span",{class:"token string"},'"tomcat"'),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"driver"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"raw_exec"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token property"},"kill_signal"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"SIGQUIT"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"resources"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"cpu"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"500")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"memory"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token number"},"512")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"env"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"APP_VERSION"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"0.1"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"CATALINA_HOME"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},[s('"'),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("NOMAD_TASK_DIR"),n("span",{class:"token punctuation"},"}")]),s('/apache-tomcat-10.1.18"')])]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"CATALINA_OPTS"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},[s('"-Xrs -Dport.http='),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("NOMAD_PORT_http"),n("span",{class:"token punctuation"},"}")]),s(" -Dport.stop="),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("NOMAD_PORT_stop"),n("span",{class:"token punctuation"},"}")]),s(" -Ddefault.context="),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("NOMAD_TASK_DIR"),n("span",{class:"token punctuation"},"}")]),s(' -Xms256m -Xmx512m"')])]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"JAVA_HOME"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"C:/Java/jdk-11"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"template"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[n("span",{class:"token property"},"data"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token heredoc string"},"<<EOF"),s(`
`),n("span",{class:"line"},'<?xml version="1.0" encoding="UTF-8"?>'),s(`
`),n("span",{class:"line"},'<Server port="${port.stop}" shutdown="SHUTDOWN">'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.startup.VersionLoggerListener"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener"/>'),s(`
`),n("span",{class:"line"},'    <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener"/>'),s(`
`),n("span",{class:"line"},"    <GlobalNamingResources>"),s(`
`),n("span",{class:"line"},'        <Resource name="UserDatabase" auth="Container" type="org.apache.catalina.UserDatabase" description="User database that can be updated and saved" factory="org.apache.catalina.users.MemoryUserDatabaseFactory" pathname="conf/tomcat-users.xml"/>'),s(`
`),n("span",{class:"line"},"    </GlobalNamingResources>"),s(`
`),n("span",{class:"line"},'    <Service name="Catalina">'),s(`
`),n("span",{class:"line"},'        <Connector port="${port.http}" protocol="HTTP/1.1" connectionTimeout="20000"/>'),s(`
`),n("span",{class:"line"},'        <Engine name="Catalina" defaultHost="localhost">'),s(`
`),n("span",{class:"line"},'            <Realm className="org.apache.catalina.realm.LockOutRealm">'),s(`
`),n("span",{class:"line"},'                <Realm className="org.apache.catalina.realm.UserDatabaseRealm" resourceName="UserDatabase"/>'),s(`
`),n("span",{class:"line"},"            </Realm>"),s(`
`),n("span",{class:"line"},'            <Host name="localhost" appBase="${default.context}/webapps/" unpackWARs="true" autoDeploy="true">'),s(`
`),n("span",{class:"line"},'                <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log" suffix=".txt" pattern="%h %l %u %t &quot;%r&quot; %s %b"/>'),s(`
`),n("span",{class:"line"},"            </Host>"),s(`
`),n("span",{class:"line"},"        </Engine>"),s(`
`),n("span",{class:"line"},"    </Service>"),s(`
`),n("span",{class:"line"},"</Server>"),s(`
`),n("span",{class:"line"},"EOF")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"destination"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"local/conf/server.xml"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"artifact"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"source"),s(),n("span",{class:"token punctuation"},"="),s(" var.tomcat_download_url")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"destination"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"local"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"artifact"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"source"),s(),n("span",{class:"token punctuation"},"="),s(" var.war_download_url")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"destination"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"local/webapps"')]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"config"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"command"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},[s('"'),n("span",{class:"token interpolation"},[n("span",{class:"token punctuation"},"$"),n("span",{class:"token punctuation"},"{"),s("CATALINA_HOME"),n("span",{class:"token punctuation"},"}")]),s('/bin/catalina.bat"')])]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"args"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"run"'),s(", "),n("span",{class:"token string"},'"-config"'),s(", "),n("span",{class:"token string"},'"%NOMAD_TASK_DIR%/conf/server.xml"'),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token keyword"},"service"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"name"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"legacy-tomcat"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"provider"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"nomad"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"tags"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"tomcat"'),n("span",{class:"token punctuation"},"]")]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token property"},"port"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"http"')]),s(`
`),n("span",{class:"line"}),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token keyword"},"check"),s(),n("span",{class:"token punctuation"},"{")]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"type"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"tcp"')]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"interval"),s(),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"10s"')]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"timeout"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"2s"')]),s(`
`),n("span",{class:"line"},[s("          "),n("span",{class:"token property"},"port"),s("  "),n("span",{class:"token punctuation"},"="),s(),n("span",{class:"token string"},'"http"')]),s(`
`),n("span",{class:"line"},[s("        "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("      "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("    "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[s("  "),n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"},[n("span",{class:"token punctuation"},"}")]),s(`
`),n("span",{class:"line"})])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=t(`<div class="hint-container tip"><p class="hint-container-title">&quot;-Xrs&quot; Java Option on Windows</p><p>Windows에서는 <code>-Xrs</code> 옵션을 자바 옵션에 추가하지 않으면, 종료시 Thread Dump만 발생하고 프로세스가 종료되지 않아 Nomad Job이 갱신되거나 새로운 배포를 수행하여도 기존 프로세스 종료가 안되어 신규 task가 실행되지 않는 현상이 있다.</p></div><h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>nginx</span></a></h2><p>Consul과 함께 구성된 경우 nginx에 동적으로 backend 구성</p><div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl" data-title="hcl"><pre class="language-hcl"><code><span class="line">job <span class="token string">&quot;nginx&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">datacenters</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;dc1&quot;</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment"># namespace = &quot;legacy&quot;</span></span>
<span class="line"></span>
<span class="line">  group <span class="token string">&quot;nginx&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">count</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">network</span> <span class="token punctuation">{</span></span>
<span class="line">      port <span class="token string">&quot;http&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">static</span> <span class="token punctuation">=</span> <span class="token number">28080</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">service</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;nginx&quot;</span></span>
<span class="line">      <span class="token property">port</span> <span class="token punctuation">=</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    task <span class="token string">&quot;nginx&quot;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">&quot;docker&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">config</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">&quot;nginx&quot;</span></span>
<span class="line">        <span class="token property">ports</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token property">volumes</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;local:/etc/nginx/conf.d&quot;</span>,</span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">template</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">data</span> <span class="token punctuation">=</span> <span class="token heredoc string">&lt;&lt;EOF</span>
<span class="line">upstream backend {</span>
<span class="line">{{ range service &quot;legacy-tomcat&quot; }}</span>
<span class="line">  server {{ .Address }}:{{ .Port }}; # Tomcat</span>
<span class="line">{{ else }}server 127.0.0.1:65535; # force a 502</span>
<span class="line">{{ end }}</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">server {</span>
<span class="line">   listen {{ env &quot;NOMAD_PORT_http&quot; }};</span>
<span class="line"></span>
<span class="line">   location /sample {</span>
<span class="line">      proxy_pass http://backend;</span>
<span class="line">   }</span>
<span class="line"></span>
<span class="line">   location /status {</span>
<span class="line">       stub_status on;</span>
<span class="line">   }</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"></span>
<span class="line">        <span class="token property">destination</span>   <span class="token punctuation">=</span> <span class="token string">&quot;local/load-balancer.conf&quot;</span></span>
<span class="line">        <span class="token property">change_mode</span>   <span class="token punctuation">=</span> <span class="token string">&quot;signal&quot;</span></span>
<span class="line">        <span class="token property">change_signal</span> <span class="token punctuation">=</span> <span class="token string">&quot;SIGHUP&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function y(h,_){const c=p("CodeTabs");return o(),r("div",null,[m,k,u(c,{id:"45",data:[{id:"Linux/MacOS"},{id:"Windows"}],"tab-id":"hcl"},{title0:a(({value:e,isActive:l})=>[s("Linux/MacOS")]),title1:a(({value:e,isActive:l})=>[s("Windows")]),tab0:a(({value:e,isActive:l})=>[v]),tab1:a(({value:e,isActive:l})=>[b]),_:1}),g])}const N=i(d,[["render",y],["__file","tomcat.html.vue"]]),f=JSON.parse('{"path":"/04-HashiCorp/07-Nomad/05-SampleJob/tomcat.html","title":"Tomcat","lang":"ko-KR","frontmatter":{"description":"Nomad + Consul Sample","tag":["Nomad","Consul","Sample","Job"],"head":[["meta",{"property":"og:url","content":"https://docmoa.github.io/04-HashiCorp/07-Nomad/05-SampleJob/tomcat.html"}],["meta",{"property":"og:site_name","content":"docmoa"}],["meta",{"property":"og:title","content":"Tomcat"}],["meta",{"property":"og:description","content":"Nomad + Consul Sample"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:updated_time","content":"2024-02-13T05:38:57.000Z"}],["meta",{"property":"article:tag","content":"Nomad"}],["meta",{"property":"article:tag","content":"Consul"}],["meta",{"property":"article:tag","content":"Sample"}],["meta",{"property":"article:tag","content":"Job"}],["meta",{"property":"article:modified_time","content":"2024-02-13T05:38:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Tomcat\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-13T05:38:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"nginx","slug":"nginx","link":"#nginx","children":[]}],"git":{"createdTime":1632449108000,"updatedTime":1707802737000,"contributors":[{"name":"Administrator","email":"admin@example.com","commits":2},{"name":"Great-Stone","email":"hahohh@gmail.com","commits":2}]},"readingTime":{"minutes":10.33,"words":620},"filePathRelative":"04-HashiCorp/07-Nomad/05-SampleJob/tomcat.md","localizedDate":"2021년 9월 24일","excerpt":"\\n<ul>\\n<li>tomcat 다운로드\\n<ul>\\n<li>다운로드 받지않고 호스트에 미리 설치해 놓는 방식이 더 가벼워보임 --&gt; 아마도 Packer, Terraform의 조합이면 가능</li>\\n<li>다운로드 받게 구성하면 컨테이너처럼 Nomad가 배포할 때마다 다운받아서 구성 가능</li>\\n</ul>\\n</li>\\n<li>Template - server.xml\\n<ul>\\n<li>server.xml 기본 구성에서 port가 선언되는 자리를 java option에서 받을 수 있도록 변경</li>\\n<li>Template 구성도 가능하고 미리 구성한 xml을 다운로드 받게 하는것도 괜찮아 보임</li>\\n</ul>\\n</li>\\n<li>Consul과 함께 구성된 경우 Nginx같은 LB 구성 Job 에서 backend를 동적으로 구성 가능</li>\\n</ul>"}');export{N as comp,f as data};
