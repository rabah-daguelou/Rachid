<template>
    <div>
        
        <div class="admin d-flex justify-content-between p-2">
            <AdminNav/>
            <router-view/>

            <div class="contain">

            </div>
        </div>
        
    
    </div>
    
</template>

<script>
    
    import AdminNav from '@/components/AdminNav.vue'
    
    export default {
        name: "AdminHome",
        components: {
           
            AdminNav
        }
        
    }
</script>

<style>
    
</style>