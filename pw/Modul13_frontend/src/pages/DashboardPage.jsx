import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import { GetAllContents } from "../api/apiContent";
import { getThumbnail } from "../api";
import Button from "react-bootstrap/Button";
import { MdFavorite } from "react-icons/md";
import { CreateFavorite } from "../api/apiFavorite";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    GetAllContents()
      .then((data) => {
        setContents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleFavorite(id_content) {
    try {
      setIsLoading(true);
      
      const response = await CreateFavorite({
        id_content,
      });
      
      if (!response) throw new Error("Failed add to favorite");

      toast.success("Success add to favorite");
    } catch (error) {
      toast.warning(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap">Rekomendasi Untukmu</h1>
        <hr className="border-top border-light opacity-50 w-100" />
      </Stack>
      {isLoading ? (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : contents?.length > 0 ? (
        <Row>
          {contents?.map((content) => (
            <Col md={6} lg={4} className="mb-3" key={content.id}>
              <div
                className="card text-white"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={getThumbnail(content.thumbnail)}
                  className="card-img w-100 h-100 object-fit-cover bg-light"
                  alt="..."
                />
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title text-truncate">
                      {content.title}
                    </h5>
                    <p className="card-text">{content.description}</p>
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleFavorite(content.id);
                      }}
                    >
                      <MdFavorite />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="dark" className="text-center">
          Tidak ada video untukmu saat ini ☹️
        </Alert>
      )}
    </Container>
  );
};
export default DashboardPage;
