<template>
  <div>
    <Form
      class="pl-2 pr-2"
      :isShowToolbar="true"
      :toolbarTitle="this.toolbarTitle"
      :isShowButton="true"
      :butonTitle="buttonTitle"
      :sending="sending"
      @submit="setComment"
    >
      <div v-if="!isOnlyForAuthorized">
        <name
          v-model="form.name"
        />
        <email
          v-model="form.email"
        />
      </div>
      <rating
        v-model="form.rating"
      />
      <comment-text
        v-model="form.comment"
      />
    </Form>



  </div>
</template>

<script>
  import Form from "~/components/Form/FormWrapper";
  import Email from "~/components/Control/Email";
  import Name from "~/components/Control/Name";
  import CommentText from "~/components/Control/CommentText";
  import Rating from "~/components/Control/Rating";
  import {mapActions} from 'vuex'

  export default {
    props: {
      productId: {
        type: Number,
      },
      isOnlyForAuthorized: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Form,
      Email,
      Name,
      CommentText,
      Rating,
    },
    data() {
      return {
        buttonTitle: 'Comment',
        toolbarTitle: 'Leave your comment here',
        sending: false,
        defaultFormValues: {
          name: '',
          email: '',
          rating: 0,
          comment: '',
          product_id: this.productId
        },
        form: {
            name: '',
            email: '',
            rating: 0,
            comment: '',
            product_id: this.productId
        },
      }
    },
    methods: {
      ...mapActions({
        setSnackbar: 'snackbar/setSnackbar'
      }),
      clearForm(){
          this.form = {...this.defaultFormValues};
      },
      setComment() {
        this.sending = true;

        this.$axios.post('/comments', this.form)
          .then(response => {

            this.clearForm();
            this.sending = false;
            this.setSnackbar(
                {active:true,
                message: 'Your comment was added. He will show after moderation',
                color: 'success'});
          })
          .catch(error => {

            this.setSnackbar(
              {active:true,
                message: error,
                color: 'info'});
          });
      },
    },
  }
</script>
