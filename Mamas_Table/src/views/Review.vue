<script>

</script>

<template>
  <div class="review-wrapper">
    <h1>Review Page</h1>
    <p>This is where you can review your previous orders and provide feedback.</p>
  </div>

  <div class="main-content">
    <h2>Submit Your Review</h2>
    <form>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="review">Review:</label>
        <textarea id="review" name="review" rows="4" required></textarea>
      </div>

      <button type="submit">Submit Review</button>
    </form>
  </div>








</template>

<style>

.review-wrapper {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
.main-content {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}



</style>