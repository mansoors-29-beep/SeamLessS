
function runWorkflow(){
  openModal(`<div class="modal-icon">✦</div><h2>Workflow Started</h2><p class="modal-subtitle">Customer Onboarding workflow is now running.</p><div class="workflow-run-modal"><div><span>✓</span><b>New Customer</b><small>Trigger received</small></div><div><span>◌</span><b>Welcome Agent</b><small>Generating personalized message...</small></div><div><span>○</span><b>Send Email</b><small>Waiting for agent</small></div></div><button class="primary-btn" onclick="closeModal()">Done</button>`);
}
function openAgentDetails(name='AI Agent'){
  openModal(`<div class="modal-icon">✦</div><h2>${name}</h2><p class="modal-subtitle">Intelligent workflow automation agent.</p><div class="agent-detail-box"><div><span>●</span><b>Agent status</b><strong>Operational</strong></div><div><span>⚡</span><b>Tasks today</b><strong>248</strong></div><div><span>◈</span><b>Success rate</b><strong>98.7%</strong></div></div><button class="primary-btn" onclick="runWorkflow()">Run Agent →</button>`);
}
function openWorkflowRuns(){
  openModal(`<div class="modal-icon">◈</div><h2>Workflow History</h2><p class="modal-subtitle">Recent automation executions.</p><div class="notification-item"><b>Customer Onboarding</b><span>Acme Technologies · Completed</span><small>2 min ago</small></div><div class="notification-item"><b>Revenue Follow-up</b><span>CloudNova · Completed</span><small>18 min ago</small></div><div class="notification-item"><b>Support Resolution</b><span>TechFlow · Processing</span><small>Now</small></div>`);
}



function newAIChat(){
  const box=document.getElementById("aiPageMessages");
  if(!box)return;
  box.innerHTML=`<div class="ai-page-message ai"><div class="message-avatar">✦</div><div class="message-content"><b>Seamless AI</b><p>New conversation started. What would you like to analyze?</p></div></div>`;
}
function clearAIPageChat(){
  newAIChat();
}
function askAIPage(text){
  const input=document.getElementById("aiPageInput");
  if(input){input.value=text;sendAIPageMessage();}
}
function sendAIPageMessage(){
  const input=document.getElementById("aiPageInput");
  const box=document.getElementById("aiPageMessages");
  if(!input||!box)return;
  const text=input.value.trim();
  if(!text)return;
  const user=document.createElement("div");
  user.className="ai-page-message user";
  user.innerHTML=`<div class="message-avatar user-avatar">SM</div><div class="message-content"><b>You</b><p>${escapeHTML(text)}</p></div>`;
  box.appendChild(user);
  input.value="";
  const ai=document.createElement("div");
  ai.className="ai-page-message ai";
  ai.innerHTML=`<div class="message-avatar">✦</div><div class="message-content"><b>Seamless AI</b><p>${aiReply(text)}</p></div>`;
  box.appendChild(ai);
  box.scrollTop=box.scrollHeight;
}

function openAIChat(){
  openModal(`
    <div class="ai-chat-modal">
      <div class="ai-chat-head"><div class="ai-chat-logo">✦</div><div><h2>Seamless AI</h2><p class="modal-subtitle">Business intelligence assistant · Online</p></div></div>
      <div class="chat-messages" id="chatMessages">
        <div class="chat-bubble ai"><b>Seamless AI</b><span>Hi Mansoor! I can help with revenue, customers, sales and workflow insights.</span></div>
        <div class="chat-suggestions">
          <button onclick="askAI('Give me a sales summary')">Sales summary</button>
          <button onclick="askAI('Which area needs attention?')">What needs attention?</button>
          <button onclick="askAI('Show revenue insights')">Revenue insights</button>
        </div>
      </div>
      <div class="chat-input-row"><input id="aiInput" placeholder="Ask Seamless AI anything..." onkeydown="if(event.key==='Enter') sendAIMessage()"><button onclick="sendAIMessage()">↑</button></div>
      <small class="ai-note">Demo assistant — responses are generated locally for this dashboard.</small>
    </div>
  `);
}
function askAI(text){
  const input=document.getElementById("aiInput");
  if(input){input.value=text;sendAIMessage();}
}
function sendAIMessage(){
  const input=document.getElementById("aiInput");
  const box=document.getElementById("chatMessages");
  if(!input||!box)return;
  const text=input.value.trim();
  if(!text)return;
  const user=document.createElement("div");
  user.className="chat-bubble user";
  user.innerHTML="<span>"+escapeHTML(text)+"</span>";
  box.appendChild(user);
  input.value="";
  const answer=document.createElement("div");
  answer.className="chat-bubble ai";
  answer.innerHTML="<b>Seamless AI</b><span>"+aiReply(text)+"</span>";
  box.appendChild(answer);
  box.scrollTop=box.scrollHeight;
}
function escapeHTML(text){
  return text.replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];});
}
function aiReply(text){
  const q=text.toLowerCase();
  if(q.includes("sales")) return "Sales pipeline is ₹28.6L, with a 24.8% conversion rate. Closed revenue is ₹12.8L.";
  if(q.includes("revenue")) return "Revenue is ₹12.8L this period, up 18.6%. Enterprise revenue is showing the strongest recent growth.";
  if(q.includes("attention")||q.includes("problem")) return "31 proposals have had no activity for more than 3 days. A follow-up campaign could help re-engage those opportunities.";
  if(q.includes("customer")) return "You currently have 1,248 active customers and 186 new customers this period.";
  if(q.includes("workflow")) return "12 workflows are active, with 8,492 tasks automated and a 98.7% success rate.";
  return "I can help you explore sales, revenue, customers and automation. Try asking for a sales summary or revenue insights.";
}
function exportSalesReport(){
  // Build a real, locally downloadable CSV report (no external service required).
  const rows = [
    ["Sales Analytics Report"],
    ["Generated", new Date().toLocaleString()],
    [],
    ["Metric", "Value", "Change"],
    ["Pipeline Value", "₹28.6L", "+21.4%"],
    ["Won Revenue", "₹12.8L", "+18.6%"],
    ["Conversion Rate", "24.8%", "+4.2%"],
    ["Average Deal Size", "₹68.4K", "+8.9%"],
    ["Sales Health", "92/100", "Excellent"],
    [],
    ["Month", "Revenue (INR)"],
    ...revenueData[6].labels.map((month, i) => [month, revenueData[6].values[i]])
  ];
  const csv = "\\uFEFF" + rows.map(row => row.map(value =>
    '"' + String(value ?? "").replace(/"/g, '""') + '"'
  ).join(",")).join("\\r\\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "seamless-sales-report-" + new Date().toISOString().slice(0,10) + ".csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openTeamProfile(){
  openModal(`
    <div class="team-profile-head">
      <div class="team-big-avatar">SM</div>
      <div>
        <h2>Seamless Team</h2>
        <p class="modal-subtitle"><span class="online-dot"></span> 4 members online</p>
      </div>
    </div>
    <div class="team-profile-grid">
      <div class="team-profile-card"><span class="team-avatar a1">M</span><div><b>Mansoor</b><small>Admin</small></div><em>Online</em></div>
      <div class="team-profile-card"><span class="team-avatar a2">V</span><div><b>VijayAnand</b><small>Developer</small></div><em>Online</em></div>
      <div class="team-profile-card"><span class="team-avatar a3">K</span><div><b>Kran</b><small>Designer</small></div><em>Online</em></div>
      <div class="team-profile-card"><span class="team-avatar a4">A</span><div><b>Azeez</b><small>Analyst</small></div><em>Online</em></div>
    </div>
    <button class="primary-btn profile-close-btn" onclick="closeModal()">Close Profile</button>
  `);
}
const pages = ["home","workflow","aichat","sales","analytics","customers","settings"];

const pageInfo = {
  home: ["Good afternoon, Mansoor 👋","Here's what's happening with your business today."],
  workflow: ["Agent Workflow","Design, monitor and run intelligent business workflows from one workspace."],
  analytics: ["Business Analytics","Understand your growth with real-time business insights."],
  customers: ["Customer Hub","Manage your growing customer community."],
  settings: ["Workspace Settings","Customize your Seamless Solutions workspace."]
};

function navigate(page){
  pages.forEach(p => {
    document.getElementById(p).classList.toggle("active-page",p===page);
  });
  document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
  document.getElementById("pageTitle").textContent=pageInfo[page][0];
  document.getElementById("pageSubtitle").textContent=pageInfo[page][1];
  history.replaceState(null,"","#"+page);
  if(page==="analytics") setTimeout(drawAnalytics,50);
}

document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    navigate(link.dataset.page);
  });
});

window.addEventListener("DOMContentLoaded",()=>{
  const page=location.hash.replace("#","").toLowerCase();
  navigate(pages.includes(page)?page:"home");
  resizeRevenue();
});

const revenueData={
  6:{labels:["Apr","May","Jun","Jul","Aug","Sep"],values:[820000,910000,980000,1080000,1160000,1280000]},
  4:{labels:["Jun","Jul","Aug","Sep"],values:[980000,1080000,1160000,1280000]},
  3:{labels:["Jul","Aug","Sep"],values:[1080000,1160000,1280000]}
};
const canvas=document.getElementById("revenueChart"),ctx=canvas.getContext("2d");
const select=document.getElementById("periodSelect");

function resizeRevenue(){
  if(!canvas)return;
  const r=canvas.getBoundingClientRect(),dpr=devicePixelRatio||1;
  canvas.width=r.width*dpr;canvas.height=r.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  drawRevenue(revenueData[select.value]);
}
function drawRevenue(data){
  const w=canvas.clientWidth,h=canvas.clientHeight,p={top:15,right:18,bottom:35,left:55},cw=w-p.left-p.right,ch=h-p.top-p.bottom,max=1400000;
  ctx.clearRect(0,0,w,h);ctx.font="11px Inter,Arial";ctx.fillStyle="#969dab";ctx.strokeStyle="#eef0f4";ctx.lineWidth=1;
  for(let i=0;i<=4;i++){let y=p.top+ch-(i/4)*ch;ctx.beginPath();ctx.moveTo(p.left,y);ctx.lineTo(w-p.right,y);ctx.stroke();ctx.fillText("₹"+i*3.5+"L",7,y+4)}
  const pts=data.values.map((v,i)=>({x:p.left+i/(data.values.length-1)*cw,y:p.top+ch-v/max*ch}));
  ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.lineTo(pts.at(-1).x,p.top+ch);ctx.lineTo(pts[0].x,p.top+ch);ctx.closePath();
  const g=ctx.createLinearGradient(0,p.top,0,p.top+ch);g.addColorStop(0,"rgba(99,91,255,.25)");g.addColorStop(1,"rgba(99,91,255,0)");ctx.fillStyle=g;ctx.fill();
  ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.strokeStyle="#635bff";ctx.lineWidth=3;ctx.stroke();
  data.labels.forEach((label,i)=>{let q=pts[i];ctx.fillStyle="#8d95a4";ctx.textAlign="center";ctx.fillText(label,q.x,h-10);ctx.beginPath();ctx.arc(q.x,q.y,4,0,Math.PI*2);ctx.fillStyle="#fff";ctx.fill();ctx.beginPath();ctx.arc(q.x,q.y,3,0,Math.PI*2);ctx.fillStyle="#635bff";ctx.fill()});ctx.textAlign="left";
}
select.addEventListener("change",()=>drawRevenue(revenueData[select.value]));

// Sales-page Revenue Performance: switch between distinct 6- and 12-month datasets.
(function(){
  const period=document.getElementById("salesRevenuePeriod");
  const bars=document.getElementById("salesRevenueBars");
  if(!period || !bars) return;
  const salesRevenue={
    6:[["Apr",42],["May",55],["Jun",49],["Jul",68],["Aug",76],["Sep",91]],
    12:[["Oct",31],["Nov",36],["Dec",40],["Jan",35],["Feb",46],["Mar",52],["Apr",42],["May",55],["Jun",49],["Jul",68],["Aug",76],["Sep",91]]
  };
  function renderSalesRevenue(){
    const data=salesRevenue[period.value] || salesRevenue[6];
    bars.innerHTML=data.map(([month,height]) =>
      '<div class="bar-group"><i style="height:'+height+'%"></i><b>'+month+'</b></div>'
    ).join("");
  }
  period.addEventListener("change",renderSalesRevenue);
  renderSalesRevenue();
})();
window.addEventListener("resize",resizeRevenue);

function drawAnalytics(){
 const c=document.getElementById("analyticsChart");if(!c)return;
 const x=c.getContext("2d"),r=c.getBoundingClientRect(),d=devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d;x.setTransform(d,0,0,d,0,0);
 const w=c.clientWidth,h=c.clientHeight,p={l:50,r:20,t:20,b:35},vals=[62,70,67,78,82,91,96,108,117,126,139,151],labels=["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],max=170;
 x.clearRect(0,0,w,h);x.font="11px Inter,Arial";x.strokeStyle="#edf0f5";x.fillStyle="#9299a8";
 for(let i=0;i<4;i++){let y=p.t+(h-p.t-p.b)*i/3;x.beginPath();x.moveTo(p.l,y);x.lineTo(w-p.r,y);x.stroke()}
 const pts=vals.map((v,i)=>({x:p.l+i/(vals.length-1)*(w-p.l-p.r),y:p.t+(h-p.t-p.b)*(1-v/max)}));
 x.beginPath();pts.forEach((q,i)=>i?x.lineTo(q.x,q.y):x.moveTo(q.x,q.y));x.strokeStyle="#635bff";x.lineWidth=3;x.stroke();
 labels.forEach((l,i)=>{x.fillStyle="#9299a8";x.textAlign="center";x.fillText(l,pts[i].x,h-10);x.beginPath();x.arc(pts[i].x,pts[i].y,3,0,Math.PI*2);x.fillStyle="#635bff";x.fill()});
}
function filterCustomers(){
 const q=document.getElementById("searchCustomer").value.toLowerCase();
 document.querySelectorAll("#customerBody tr").forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q)?"":"none");
}
function openModal(content){
 const overlay=document.getElementById("modalOverlay");
 document.getElementById("modalContent").innerHTML=content;
 overlay.classList.add("show");
}
function closeModal(e){
 const overlay=document.getElementById("modalOverlay");
 if(!overlay) return;
 if(!e || e.target===overlay){
   overlay.classList.remove("show");
 }
}
function closeTeamProfile(){
 const overlay=document.getElementById("modalOverlay");
 if(overlay) overlay.classList.remove("show");
}
window.closeTeamProfile=closeTeamProfile;
function showNotifications(){
 openModal(`
   <div class="modal-icon">⌁</div>
   <h2>Notifications</h2>
   <p class="modal-subtitle">Your latest workspace updates.</p>
   <div class="notification-item"><b>Payment received</b><span>₹48,000 from CloudNova</span><small>32 min ago</small></div>
   <div class="notification-item"><b>New customer</b><span>Acme Technologies joined</span><small>10 min ago</small></div>
   <div class="notification-item"><b>Subscription upgraded</b><span>CloudNova moved to Pro</span><small>1 hour ago</small></div>
 `);
}
function openCalendar(){
 openModal(`
   <div class="modal-icon">▣</div>
   <h2>October 2026</h2>
   <p class="modal-subtitle">Select a reporting date.</p>
   <div class="calendar-head"><b>October</b><span>2026</span></div>
   <div class="calendar-grid">
    <b>Mo</b><b>Tu</b><b>We</b><b>Th</b><b>Fr</b><b>Sa</b><b>Su</b>
    <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
    <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
    <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
    <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
    <span>26</span><span>27</span><span class="today">28</span><span>29</span><span>30</span><span>31</span>
   </div>
 `);
}
function showAllActivity(){
 openModal(`
   <div class="modal-icon">↗</div>
   <h2>Recent Activity</h2>
   <p class="modal-subtitle">All recent business activity.</p>
   <div class="notification-item"><b>New customer</b><span>Acme Technologies joined Seamless Solutions</span><small>10 min ago</small></div>
   <div class="notification-item"><b>Payment received</b><span>₹48,000 subscription payment received</span><small>32 min ago</small></div>
   <div class="notification-item"><b>New subscription</b><span>Pro Plan activated successfully</span><small>1 hour ago</small></div>
   <div class="notification-item"><b>Customer upgrade</b><span>CloudNova upgraded to Enterprise</span><small>2 hours ago</small></div>
   <div class="notification-item"><b>Support ticket resolved</b><span>Billing issue for TechFlow was resolved</span><small>3 hours ago</small></div>
 `);
}
function openAddCustomer(){
 openModal(`
   <div class="modal-icon">+</div>
   <h2>Add Customer</h2>
   <p class="modal-subtitle">Create a new customer profile.</p>
   <label class="modal-label">Customer name<input id="newCustomerName" class="modal-input" placeholder="Enter customer name"></label>
   <label class="modal-label">Email<input id="newCustomerEmail" class="modal-input" placeholder="customer@example.com"></label>
   <label class="modal-label">Plan<select id="newCustomerPlan" class="modal-input"><option>Starter</option><option>Pro</option><option>Enterprise</option></select></label>
   <button class="primary-btn modal-submit" onclick="saveNewCustomer()">Add Customer</button>
 `);
}
function saveNewCustomer(){
 const name=document.getElementById("newCustomerName").value.trim();
 const email=document.getElementById("newCustomerEmail").value.trim();
 const plan=document.getElementById("newCustomerPlan").value;
 if(!name || !email){alert("Please enter customer name and email.");return;}
 const row=document.createElement("tr");
 row.innerHTML=`<td><b>${name}</b><small>${email}</small></td><td>${plan}</td><td><em class="status active">Active</em></td><td>₹0</td><td>Today</td>`;
 document.getElementById("customerBody").prepend(row);
 closeModal();
 alert(name+" added successfully.");
}
function showSettingTab(tab,button){
 document.querySelectorAll(".setting-tab").forEach(b=>b.classList.remove("active"));
 button.classList.add("active");
 const form=document.querySelector(".settings-form");
 if(tab==="general"){
   form.innerHTML=`<h3>Company Information</h3><p>Update your organization details.</p>
   <label>Company name<input value="Seamless Solutions"></label>
   <label>Workspace email<input value="team@seamlesssolutions.com"></label>
   <label>Industry<select><option>SaaS & Technology</option><option>Finance</option><option>Education</option></select></label>
   <button class="primary-btn" onclick="saveSettings()">Save Changes</button><span id="saveMessage"></span>`;
 }else if(tab==="notifications"){
   form.innerHTML=`<h3>Notifications</h3><p>Choose which updates you want to receive.</p>
   <label class="switch-row">Email notifications <input type="checkbox" checked><span>Receive important account updates</span></label>
   <label class="switch-row">Payment alerts <input type="checkbox" checked><span>Get notified about payments</span></label>
   <label class="switch-row">Customer activity <input type="checkbox" checked><span>Receive customer updates</span></label>
   <button class="primary-btn" onclick="saveSettings()">Save Preferences</button><span id="saveMessage"></span>`;
 }else if(tab==="security"){
   form.innerHTML=`<h3>Security</h3><p>Manage your workspace security settings.</p>
   <div class="security-box"><b>Two-factor authentication</b><span>Recommended for administrators</span><button class="outline-btn" onclick="alert('2FA setup opened.')">Configure</button></div>
   <div class="security-box"><b>Active sessions</b><span>3 devices currently signed in</span><button class="outline-btn" onclick="alert('Session manager opened.')">Manage</button></div>`;
 }else{
   form.innerHTML=`<h3>Billing</h3><p>Manage your subscription and invoices.</p>
   <div class="billing-card"><span>Current plan</span><strong>Pro</strong><b>₹4,200 / month</b><small>Next billing date: October 28, 2026</small></div>
   <button class="primary-btn" onclick="alert('Billing management opened.')">Manage Billing</button>`;
 }
}
function saveSettings(){
 const msg=document.getElementById("saveMessage");
 if(msg){msg.textContent="✓ Changes saved successfully";setTimeout(()=>msg.textContent="",2500);}
}


/* ===== FINAL WORKING INTERACTIONS ===== */
(function(){
  function esc(v){
    return String(v).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];
    });
  }

  window.askAIPage = function(text){
    var input=document.getElementById("aiPageInput");
    if(!input) return;
    input.value=text;
    window.sendAIPageMessage();
  };

  window.sendAIPageMessage = function(){
    var input=document.getElementById("aiPageInput");
    var box=document.getElementById("aiPageMessages");
    if(!input || !box) return;
    var text=input.value.trim();
    if(!text) return;

    var user=document.createElement("div");
    user.className="ai-page-message user";
    user.innerHTML='<div class="message-avatar user-avatar">SM</div><div class="message-content"><b>You</b><p>'+esc(text)+'</p></div>';
    box.appendChild(user);

    var q=text.toLowerCase();
    var reply="I can help with sales, revenue, customers, analytics and workflows.";
    if(q.indexOf("sales")>=0) reply="Sales pipeline is ₹28.6L, won revenue is ₹12.8L and conversion rate is 24.8%.";
    else if(q.indexOf("revenue")>=0) reply="Revenue is ₹12.8L and is up 18.6% this month. Enterprise revenue is showing strong growth.";
    else if(q.indexOf("customer")>=0) reply="There are 1,248 active customers and 186 new customers. Customer retention is 94.2%.";
    else if(q.indexOf("workflow")>=0 || q.indexOf("automation")>=0) reply="12 workflows are active, 8,492 tasks have been automated and the workflow success rate is 98.7%.";
    else if(q.indexOf("attention")>=0) reply="31 proposals have had no activity for more than 3 days and may need follow-up.";

    var ai=document.createElement("div");
    ai.className="ai-page-message ai";
    ai.innerHTML='<div class="message-avatar">✦</div><div class="message-content"><b>Seamless AI</b><p>'+reply+'</p></div>';
    box.appendChild(ai);
    input.value="";
    box.scrollTop=box.scrollHeight;
  };

  window.newAIChat=function(){
    var box=document.getElementById("aiPageMessages");
    if(!box) return;
    box.innerHTML='<div class="ai-page-message ai"><div class="message-avatar">✦</div><div class="message-content"><b>Seamless AI</b><p>New conversation started. What would you like to analyze?</p></div></div>';
  };
  window.clearAIPageChat=window.newAIChat;

  window.runWorkflow=function(name){
    name=name||"Agent Workflow";
    openModal('<div class="workflow-run-modal"><div class="run-loader">✦</div><h2>Running '+esc(name)+'</h2><p class="modal-subtitle">Seamless AI is processing your workflow...</p><div class="run-steps"><div class="run-step done">✓ Trigger received</div><div class="run-step active">◌ AI agent processing</div><div class="run-step">○ Executing actions</div><div class="run-step">○ Updating results</div></div></div>');
    setTimeout(function(){
      var content=document.getElementById("modalContent");
      if(content){
        content.innerHTML='<div class="workflow-run-modal"><div class="run-success">✓</div><h2>Workflow completed</h2><p class="modal-subtitle"><b>'+esc(name)+'</b> finished successfully.</p><div class="run-result-grid"><div><b>24</b><small>Tasks processed</small></div><div><b>98%</b><small>Success rate</small></div><div><b>1.8m</b><small>Time saved</small></div></div><button class="primary-btn" type="button" onclick="closeModal()">Done</button></div>';
      }
    },1600);
  };


  // Catch workflow buttons with common labels/classes, without breaking existing handlers.
  document.addEventListener("click",function(e){
    var btn=e.target.closest("button, a");
    if(!btn) return;
    var txt=(btn.textContent||"").trim().toLowerCase();
    if(txt==="run workflow" || txt==="run workflow →" || txt.includes("run workflow")){
      if(!btn.dataset.workflowBound){
        e.preventDefault();
        window.runWorkflow(btn.dataset.workflow || "Customer Follow-up Workflow");
      }
    }
  },true);

  // Ensure hash navigation works on local file:// URLs.
  window.addEventListener("hashchange",function(){
    var p=location.hash.replace("#","").toLowerCase();
    if(window.navigate && ["home","workflow","aichat","sales","analytics","customers","settings"].indexOf(p)>=0){
      window.navigate(p);
    }
  });

  document.addEventListener("DOMContentLoaded",function(){
    var p=location.hash.replace("#","").toLowerCase();
    if(window.navigate) window.navigate(["home","workflow","aichat","sales","analytics","customers","settings"].indexOf(p)>=0?p:"home");

    var input=document.getElementById("aiPageInput");
    if(input){
      input.addEventListener("keydown",function(e){
        if(e.key==="Enter"){e.preventDefault();window.sendAIPageMessage();}
      });
    }

    // Convert any workflow run button to an explicit functional button.
    document.querySelectorAll("button,a").forEach(function(btn){
      var t=(btn.textContent||"").trim().toLowerCase();
      if(t.includes("run workflow")){
        btn.dataset.workflowBound="1";
        if(!btn.getAttribute("onclick")){
          btn.addEventListener("click",function(ev){
            ev.preventDefault();
            window.runWorkflow(btn.dataset.workflow || "Customer Follow-up Workflow");
          });
        }
      }
    });
  });
})();
