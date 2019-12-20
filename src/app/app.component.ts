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
  branchList = [];
  projectList = [];
  branchCommit = [];
  showSpinner: Boolean = false;
  username: String = "grpc";
  repo: String = "Select Project";
  branch: String = "Select Branch";
  showProjDropDown: Boolean = false;
  showBranchDropDown: Boolean = false;

  constructor(private gitHubService: GitHubService) { }

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
        this.getAllBranch();
      },
      err => {
        this.showSpinner = false;
        this.commitList = [];
      }
    );
  }
  getProjectList() {
    this.showSpinner = true;
    this.gitHubService.getProjectList(this.username).subscribe(
      res => {
        this.showSpinner = false;
        this.repo = 'Select Project'
        this.branch = 'Select Branch'
        this.showProjDropDown = true;
        this.projectList = res.body;
        this.branchList = [],
          this.showBranchDropDown = false,
          this.branchCommit = []
      },
      err => {
        this.showProjDropDown = false;
        this.projectList = [];
      }
    );
  }

  getAllBranch() {
    this.showSpinner = true;
    this.gitHubService.getAllBranch(this.username, this.repo).subscribe(
      res => {
        this.showSpinner = false;
        this.branch = 'Select Branch'
        this.branchList = res.body;
        this.branchCommit = []
        this.showBranchDropDown = true
      },
      err => {
        this.showBranchDropDown = false
        this.showSpinner = false;
        this.branchList = [];
      }
    )
  }
  getCommitByBranchSha(sha: String, branch: String) {
    this.showSpinner = true;
    const currentSha = sha;
    this.branch = branch;
    console.log(sha);
    this.gitHubService.getCommitByBranchSha(this.username, this.repo, currentSha).subscribe(
      res => {
        this.showSpinner = false;
        this.branchCommit = res.body;
        console.log(res);
      },
      err => {
        this.showSpinner = false;
        this.branchCommit = [];
      }
    )
  }
  projectOnClick(repoName: String) {
    this.repo = repoName;
    this.getAllBranch();
  }
}
