fetch('http://localhost:4321/spare-parts')
  .then(r => r.text())
  .then(t => {
    if(t.includes("Something didn't load correctly")) {
       console.log("CRASH DETECTED");
    } else {
       console.log("SITE LOADED PERFECTLY");
    }
  });
