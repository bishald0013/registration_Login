import React from "react";

function PasswordResetEmail() {
  return (
    <div className="container mt-5 w-25">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            New Password
          </label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="password"
            
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
          Confirm password
          </label>
          <input
            type="password"
            name="confirm_password"
            class="form-control"
            id="confirm_password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PasswordResetEmail;
