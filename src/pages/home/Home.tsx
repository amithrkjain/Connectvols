import { useEffect } from "react";
import Page from "../../components/Page";
import { convertStyleToReact } from "../../utils/helper.function";
import "./home.css";

export default function Home() {
  useEffect(() => {
    convertStyleToReact(
      "border-bottom-width: 1px;border-bottom-color: var(--bs-navbar-active-color);"
    );
  }, []);
  return (
    <Page title="Home">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="panel panel-white profile-widget">
              <div className="row">
                <div className="col-sm-12">
                  <div
                    className="image-container bg2"
                    style={convertStyleToReact(
                      "background:url(http://www.bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg)"
                    )}
                  >
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      className="avatar"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="details">
                    <h4>
                      John Smit Doe <i className="fa fa-sheild"></i>
                    </h4>
                    <div>Works at Bootdey.com</div>
                    <div>Attended University of Bootdey</div>
                    <div>Lives in Medellin, Colombia</div>
                    <div className="mg-top-10">
                      <a href="#" className="btn btn-default">
                        About Kevin
                      </a>
                      <a href="#" className="btn btn-success">
                        Add Kevin
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-white post">
                  <div className="post-heading">
                    <div className="pull-left image">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        className="img-circle avatar"
                        alt="user profile image"
                      />
                    </div>
                    <div className="pull-left meta">
                      <div className="title h5">
                        <a href="#">
                          <b>John Doe</b>
                        </a>
                        uploaded a photo.
                      </div>
                      <h6 className="text-muted time">5 seconds ago</h6>
                    </div>
                  </div>
                  <div className="post-image">
                    <img
                      src="https://www.bootdey.com/image/400x200"
                      className="image"
                      alt="image post"
                    />
                  </div>
                  <div className="post-description">
                    <h4>Product Shoot</h4>
                    <p>
                      Here is a picture of the walkway to our product shoot.
                    </p>
                    <div className="stats">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-default stat-item"
                      >
                        <i className="fa fa-thumbs-up icon"></i>228
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-default stat-item"
                      >
                        <i className="fa fa-share icon"></i>128
                      </a>
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="Add a comment"
                        type="text"
                      />
                      <span className="input-group-addon">
                        <a href="javascript:void(0);">
                          <i className="fa fa-edit"></i>
                        </a>
                      </span>
                    </div>
                    <ul className="comments-list">
                      <li className="comment">
                        <a className="pull-left" href="javascript:void(0);">
                          <img
                            className="avatar"
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt="avatar"
                          />
                        </a>
                        <div className="comment-body">
                          <div className="comment-heading">
                            <h4 className="user">John dOE</h4>
                            <h5 className="time">7 minutes ago</h5>
                          </div>
                          <p>
                            I really love this picture. I really wish i could
                            have been there.
                          </p>
                        </div>
                      </li>
                      <li className="comment">
                        <a className="pull-left" href="javascript:void(0);">
                          <img
                            className="avatar"
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            alt="avatar"
                          />
                        </a>
                        <div className="comment-body">
                          <div className="comment-heading">
                            <h4 className="user">John Doe</h4>
                            <h5 className="time">3 minutes ago</h5>
                          </div>
                          <p>
                            I think I might you this for one of my projects.
                          </p>
                        </div>
                      </li>
                      <li className="comment">
                        <a className="pull-left" href="javascript:void(0);">
                          <img
                            className="avatar"
                            src="https://bootdey.com/img/Content/avatar/avatar4.png"
                            alt="avatar"
                          />
                        </a>
                        <div className="comment-body">
                          <div className="comment-heading">
                            <h4 className="user">John Doe</h4>
                            <h5 className="time">10 seconds ago</h5>
                          </div>
                          <p>Wow! This is gorgeous.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="panel panel-white post">
                  <div className="post-heading">
                    <div className="pull-left image">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        className="img-circle avatar"
                        alt="user profile image"
                      />
                    </div>
                    <div className="pull-left meta">
                      <div className="title h5">
                        <a href="#">
                          <b>John Doe</b>
                        </a>
                        made a post.
                      </div>
                      <h6 className="text-muted time">1 minute ago</h6>
                    </div>
                  </div>
                  <div className="post-description">
                    <p>
                      Anyone who is interested in helping out with the Mark
                      &amp; Markson dinner party, please let me know before the
                      week is over.
                    </p>
                    <div className="stats">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-default stat-item"
                      >
                        <i className="fa fa-thumbs-up icon"></i>2
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-default stat-item"
                      >
                        <i className="fa fa-share icon"></i>12
                      </a>
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="Add a comment"
                        type="text"
                      />
                      <span className="input-group-addon">
                        <a href="javascript:void(0);">
                          <i className="fa fa-edit"></i>
                        </a>
                      </span>
                    </div>
                    <ul className="comments-list">
                      <li className="comment">
                        <a className="pull-left" href="javascript:void(0);">
                          <img
                            className="avatar"
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            alt="avatar"
                          />
                        </a>
                        <div className="comment-body">
                          <div className="comment-heading">
                            <h4 className="user">Gavino Free</h4>
                            <h5 className="time">5 minutes ago</h5>
                          </div>
                          <p>Sure, I'd help out.</p>
                        </div>
                        <ul className="comments-list">
                          <li className="comment">
                            <a className="pull-left" href="javascript:void(0);">
                              <img
                                className="avatar"
                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                alt="avatar"
                              />
                            </a>
                            <div className="comment-body">
                              <div className="comment-heading">
                                <h4 className="user">John Doe</h4>
                                <h5 className="time">3 minutes ago</h5>
                              </div>
                              <p>I will email you the details.</p>
                            </div>
                          </li>
                          <li className="comment">
                            <a className="pull-left" href="javascript:void(0);">
                              <img
                                className="avatar"
                                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                alt="avatar"
                              />
                            </a>
                            <div className="comment-body">
                              <div className="comment-heading">
                                <h4 className="user">John Doe</h4>
                                <h5 className="time">3 minutes ago</h5>
                              </div>
                              <p>Ok, cool.</p>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="panel panel-white post">
                  <div className="post-heading">
                    <div className="pull-left image">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar5.png"
                        className="img-circle avatar"
                        alt="user profile image"
                      />
                    </div>
                    <div className="pull-left meta">
                      <div className="title h5">
                        <a href="#">
                          <b>Yanique Robinson</b>
                        </a>
                        shared a video.
                      </div>
                      <h6 className="text-muted time">1 minute ago</h6>
                    </div>
                  </div>
                  <div className="post-video">
                    <div
                      className="fluid-width-video-wrapper"
                      style={convertStyleToReact("padding-top: 56.2%;")}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/98417189"
                        id="fitvid369523"
                      ></iframe>
                    </div>
                  </div>
                  <div className="post-description">
                    <div className="stats">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-default stat-item"
                      >
                        <i className="fa fa-thumbs-up icon"></i>2
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-default stat-item"
                      >
                        <i className="fa fa-share icon"></i>12
                      </a>
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="Add a comment"
                        type="text"
                      />
                      <span className="input-group-addon">
                        <a href="javascript:void(0);">
                          <i className="fa fa-edit"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
