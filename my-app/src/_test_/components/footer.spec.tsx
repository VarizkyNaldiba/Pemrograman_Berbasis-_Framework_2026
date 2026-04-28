import { render, screen } from "@testing-library/react"
import Footer from "@/components/layouts/Footer"

describe("Footer Component", () => {
  it("renders footer correctly", () => {
    const page = render(<Footer />)
    expect(screen.getByTestId("footer")).toBeTruthy()
    expect(screen.getByTestId("footer-text").textContent).toBe("Footer Component")
    expect(page).toMatchSnapshot()
  })
})
