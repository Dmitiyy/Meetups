<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Container'
}
</script>

<style lang="sass">
.container
    width: 1500px
    margin: 0 auto
    margin-bottom: 60px
@media (max-width: 1530px) and (min-width: 1021px) 
    .container
        width: 900px
@media (max-width: 1020px) and (min-width: 731px) 
    .container
        width: 700px
@media (max-width: 730px) and (min-width: 476px) 
    .container
        width: 450px
@media (max-width: 475px) and (min-width: 300px) 
    .container
        width: 300px
</style>