import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import CommentList from "../components/comments/CommentList";

const fakeComments = [
  { id: 1, text: "Bình luận 1", username: "User1" },
  { id: 2, text: "Bình luận 2", username: "User2" },
];

describe("CommentList", () => {
  test("render comments", () => {
    render(
      <AuthProvider>
        <CommentList comments={fakeComments} />
      </AuthProvider>
    );

    expect(screen.getByText(/Bình luận 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Bình luận 2/i)).toBeInTheDocument();
  });
});
