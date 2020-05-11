<template>
  <div class="container mt-3">
    <h3>Mb show one of these 4 depending on some calculation</h3>
    <div class="alert alert-dismissible alert-success">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Best change of survival</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
    </div>
    
    <div class="alert alert-dismissible alert-info">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Middle chance</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it's not super important.
    </div>
    <div class="alert alert-dismissible alert-warning">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <h4 class="alert-heading">Warning!</h4>
      <p class="mb-0">Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a href="#" class="alert-link">vel scelerisque nisl consectetur et</a>.</p>
    </div>
    <div class="alert alert-dismissible alert-danger">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Worst</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>