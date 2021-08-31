<template>
  <div id="page" class="layout-default">
    <Sidebar/>
    <div>
      <Header/>
      <main id="main" class="main">
        <Breadcrumb/>
        <div id="content">
          <div class="wrapper">
            <Nuxt/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#page {
  display: flex;
  height: 100vh;
}
#sidebar + div {
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
#header {
  flex: 0 0 auto;
}
#main {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 1rem 2rem;
  overflow: auto;
  
  & > :first-child {
    margin-top: 0;
  }
}
#content {
  flex: 1 1 auto;
  background: white;
  border: 1px solid transparent;

  & > .wrapper {
    margin: 2rem;
  }
}

</style>