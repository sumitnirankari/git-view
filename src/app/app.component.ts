import { Component } from "@angular/core";
import { GitHubService } from "./service/github.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'git-view';
  commitList = [];
  showSpinner: Boolean = false;
  username: String = "grpc";
  repo: String = "grpc";

  constructor(private gitHubService: GitHubService) {}

  /**
   * @method getRepoCommit
   * @description Call GitHub service to get user's repository commit list.
   * @return {void}
   */
  getRepoCommit() {
    this.showSpinner = true;
    this.gitHubService.getRepoCommit(this.username, this.repo).subscribe(
      res => {
        this.showSpinner = false;
        this.commitList = res.body;
      },
      err => {
        this.showSpinner = false;
        this.commitList = [];
      }
    );
  }
}
