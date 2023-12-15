import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import { getThumbnail } from "../api";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { DeleteFavorite, GetMyFavorite } from "../api/apiFavorite";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  useEffect(() => {
    setIsLoading(true);
    GetMyFavorite()
      .then((data) => {
        setFavorites(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleFavorite(id_favorite) {
    try {
      setIsLoading(true);
      const response = await DeleteFavorite(id_favorite);

      if (!response) throw new Error("Failed delete to favorite");

      const data = favorites.filter((favorite) => favorite.id !== id_favorite);
      setFavorites(data);

      toast.success("Success delete to favorite");
    } catch (error) {
      toast.warning(error.message);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  }
  console.log(favorites);
  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap">My Favorite</h1>
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
      ) : favorites?.length > 0 ? (
        <Row>
          {favorites?.map((favorite) => (
            <Col md={6} lg={4} className="mb-3" key={favorite.id}>
              <div
                className="card text-white"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={getThumbnail(favorite.content.thumbnail)}
                  className="card-img w-100 h-100 object-fit-cover bg-light"
                  alt="..."
                />
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title text-truncate">
                      {favorite.content.title}
                    </h5>
                    <p className="card-text">{favorite.content.description}</p>
                  </div>
                  <div>
                    <Button variant="danger" onClick={handleShow}>
                      <FaTrash />
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Apakah kamu yakin ingin hapus video ini?
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleFavorite(favorite.id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
export default FavoritePage;
