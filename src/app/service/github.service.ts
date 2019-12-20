import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class GitHubService {
  constructor(private apiService: ApiService) {}

  /**
   * @method getRepoCommit
   * @param username GitHub username.
   * @param repo GitHub repository name.
   * @description Returns Commit list of user's repository.
   * @return An Observable of the response body as a JSON object.
   */
  getRepoCommit(username: String, repo: String) {
    return this.apiService.get(
      `https://api.github.com/repos/${username}/${repo}/commits`
    );
  }
  /**
   *
   * @param username GitHub usename.
   * @param repo GitHub repository name.
   */
  getAllBranch(username: String, repo: String) {
    return this.apiService.get(
      `https://api.github.com/repos/${username}/${repo}/branches`
    );
  }
  getCommitByBranchSha(username: String, repo: String, sha: String) {
    return this.apiService.get(
      `https://api.github.com/repos/${username}/${repo}/commits?sha=${sha}`
    );
  }
  getProjectList(username: String) {
    return this.apiService.get(
      `https://api.github.com/users/${username}/repos`
    );
  }

}
