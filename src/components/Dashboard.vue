<template>
  <div>
      <Navbar/>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">

          <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
//載入其他網頁
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './AlertMessage';


export default {
    components:{        
        Sidebar,
        Navbar,
        Alert,
    },
    
};
</script>
