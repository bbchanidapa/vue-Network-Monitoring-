<template>
    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" @click="closeModal()"></button>
        </header>
        <section class="modal-card-body">
          {{detailData}}
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success">Save changes</a>
          <a class="button">Cancel</a>
        </footer>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['showModal', 'titleData', 'closeModal', 'detailData']
  }
</script>
